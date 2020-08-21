package com.teste.igtiquiz.RecyclerViews;

import android.app.Activity;
import android.content.Intent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RadioGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.teste.igtiquiz.R;
import com.teste.igtiquiz.ResultActivity;
import com.teste.igtiquiz.model.Pergunta;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PerguntaQuizAdpater extends RecyclerView.Adapter<PerguntaQuizAdpater.PerguntaHolder> {

    private Activity act;
    private int layoutTemplate;
    private List<Pergunta> perguntas;
    private List<RadioGroup> listRadioGroup;
    private Set<Integer> numeroDePerguntasRespondidas;
    private Set<Pergunta> numeroAcertos;
    private boolean auxClear = false;

    public PerguntaQuizAdpater(Activity act, List<Pergunta> perguntas) {

        this.act = act;
        this.perguntas = perguntas;
        numeroDePerguntasRespondidas = new HashSet<>();
        numeroAcertos = new HashSet<>();
        listRadioGroup = new ArrayList<>();
    }

    @NonNull
    @Override
    public PerguntaHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = this.act.getLayoutInflater().inflate(this.layoutTemplate, parent, false);
        PerguntaHolder perguntaHolder = new PerguntaHolder(view);

        return perguntaHolder;

    }

    @Override
    public void onBindViewHolder(@NonNull PerguntaHolder holder, int position) {

        Pergunta pergunta = this.perguntas.get(position);
        holder.pergunta.setText(pergunta.getPergunta());

        this.listRadioGroup.add(holder.rg);

    }

    @Override
    public int getItemCount() {
        return this.perguntas.size();
    }

    public void setLayoutTemplate(int layout) {

        this.layoutTemplate = layout;
    }

    public void updateLista(List<Pergunta> perguntas) {

        this.perguntas = perguntas;
    }

    public void resetRadioGroups() {

        if (this.listRadioGroup != null && !this.listRadioGroup.isEmpty()
                && !this.numeroDePerguntasRespondidas.isEmpty()) {

            //Lanço de limpeza dos RadioGroups Preenchidos
            this.auxClear = true;
            for (int i = 0; i < this.listRadioGroup.size(); i++) {

                /*
                Condicional if(!loop) para cada RadioGroup.
                Condicional if(!loop) para diferenciar entre limpeza e check do RadioButton.
                Método Listener onCheckedChanged ativado após limpeza/alteração do estado do radioButton por
                isso que após limpeza o método invoca todo bloco de código contido nele
                 */
                RadioGroup rg = this.listRadioGroup.get(i);
                if(rg.getCheckedRadioButtonId()== -1){
                    continue;
                }
                rg.clearCheck();

            }

            auxClear = false;
            numeroDePerguntasRespondidas.clear();
            numeroAcertos.clear();

        }

    }

    public class PerguntaHolder extends RecyclerView.ViewHolder {

        public TextView pergunta;
        public RadioGroup rg;

        public PerguntaHolder(@NonNull View itemView) {
            super(itemView);

            this.pergunta = itemView.findViewById(R.id.textViewPerguntaQuiz);
            this.rg = itemView.findViewById(R.id.rbGroupQuiz);

            rg.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(RadioGroup radioGroup, int id) {

                    //Condicional para check da resposta.
                    //Quando auxClear=true significada que estamos no laço de limpeza dos RadioButtons.
                    if (!auxClear) {

                        Pergunta pergunta = perguntas.get(getAdapterPosition());
                        numeroDePerguntasRespondidas.add(pergunta.getId());

                        int escolha = (id == R.id.rbVerdadeira ? 1 : 0);
                        if (pergunta.getResposta() == escolha) {

                            numeroAcertos.add(pergunta);

                        } else {

                            numeroAcertos.remove(pergunta);
                        }


                        if (perguntas.size() == numeroDePerguntasRespondidas.size()) {

                            Intent intent = new Intent(act, ResultActivity.class);
                            intent.putExtra("numeroDePerguntas", numeroDePerguntasRespondidas.size());
                            intent.putExtra("numeroAcertos", numeroAcertos.size());
                            act.startActivity(intent);

                        }
                    }

                }

            });

        }
    }

}

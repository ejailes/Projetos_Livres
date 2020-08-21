package com.teste.igtiquiz.RecyclerViews;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.teste.igtiquiz.AlterarPerguntaActivity;
import com.teste.igtiquiz.R;
import com.teste.igtiquiz.model.Pergunta;
import com.teste.igtiquiz.util.DatabaseHelper;

import java.util.List;

public class PerguntaAdpater extends RecyclerView.Adapter<PerguntaAdpater.PerguntaHolder>{

    private Activity act;
    private List<Pergunta> perguntas;
    private int layoutTemplate;


    public PerguntaAdpater(Activity act, List<Pergunta> perguntas){

        this.act = act;
        this.perguntas = perguntas;
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

    }

    @Override
    public int getItemCount() {
        return this.perguntas.size();
    }

    public class PerguntaHolder extends RecyclerView.ViewHolder {

        public TextView pergunta;
        public TextView excluir, alterar;

        public PerguntaHolder(@NonNull View itemView) {
            super(itemView);

            this.pergunta = itemView.findViewById(R.id.textViewPergunta);
            this.alterar = itemView.findViewById(R.id.textViewAlterar);
            this.excluir = itemView.findViewById(R.id.textViewDeletar);

            this.alterar.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {

                    Intent intent = new Intent(act, AlterarPerguntaActivity.class);
                    intent.putExtra("Pergunta", perguntas.get(getLayoutPosition()));
                    act.startActivity(intent);
                }
            });

            this.excluir.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {

                    AlertDialog.Builder alerta = new AlertDialog.Builder(act);
                    alerta.setTitle("Deletar Pergunta");
                    alerta.setMessage("Você tem certeza que deseja deletar esta pergunta?");
                    alerta.setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {

                            Pergunta pergunta = perguntas.get(getLayoutPosition());

                            DatabaseHelper dbh = new DatabaseHelper(act);
                            dbh.deletePergunta(pergunta);

                            perguntas.remove(pergunta);
                            notifyDataSetChanged();
                        }
                    });

                    alerta.setNegativeButton("CANCELAR", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {

                            dialogInterface.dismiss();
                        }
                    });

                    alerta.show();
                }
            });

        }
    }

    public void setLayoutTemplate(int layout){

        this.layoutTemplate = layout;
    }

    public void updateLista(List<Pergunta> perguntas){

        this.perguntas = perguntas;
    }

}

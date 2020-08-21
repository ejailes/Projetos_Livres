package com.teste.igtiquiz;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.teste.igtiquiz.model.Pergunta;
import com.teste.igtiquiz.util.DatabaseHelper;

public class AlterarPerguntaActivity extends AppCompatActivity {

    private TextView titulo;
    private EditText pergunta;
    private RadioGroup radioGroup;
    private RadioButton verdadeira;
    private RadioButton falsa;
    private Button btSalvar;
    private Toolbar toolbar;

    private Pergunta perguntaSerializada;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adicionar_pergunta);

        this.toolbar = findViewById(R.id.toolbarCadastroPergunta);
        this.toolbar.setTitle("Alterar Pergunta");
        setSupportActionBar(this.toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        this.titulo = findViewById(R.id.textViewTitulo);
        this.titulo.setText("ALTERAR PERGUNTA");

        this.pergunta = findViewById(R.id.editTextPergunta);
        this.radioGroup = findViewById(R.id.radioButtonGrupo);
        this.verdadeira = this.radioGroup.findViewById(R.id.radioButtonVerdade);
        this.falsa = this.radioGroup.findViewById(R.id.radioButtonFalsa);
        this.btSalvar = findViewById(R.id.btSalvar);

        Bundle dados = getIntent().getExtras();
        if(dados != null && !dados.isEmpty()){

            perguntaSerializada = (Pergunta) dados.getSerializable("Pergunta");
            this.pergunta.setText(perguntaSerializada.getPergunta());

            if(perguntaSerializada.getResposta() == 1){

                this.verdadeira.setChecked(true);

            } else {

                this.falsa.setChecked(true);
            }
        }

        this.btSalvar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(isPergunta() && isResposta()){

                    pergunta.setError(null);
                    View radioCheckedView = radioGroup.findViewById(radioGroup.getCheckedRadioButtonId());
                    RadioButton rb = (RadioButton) radioGroup.getChildAt(radioGroup.indexOfChild(radioCheckedView));

                    perguntaSerializada.setPergunta(pergunta.getText().toString());
                    perguntaSerializada.setResposta(rb.getText().equals("VERDADEIRA") ? 1 : 0);

                    //Update Pergunta
                    DatabaseHelper dbh = new DatabaseHelper(AlterarPerguntaActivity.this);
                    dbh.updatePergunta(perguntaSerializada);

                    Toast.makeText(AlterarPerguntaActivity.this, "Pergunta alterada com sucesso !!!", Toast.LENGTH_SHORT).show();
                    finish();

                }
            }
        });
    }

    private boolean isPergunta(){

        String pergunta = this.pergunta.getText().toString();
        if(pergunta !=null && !pergunta.isEmpty()){

            return true;
        }

        this.pergunta.setError("Pergunta inválida");
        return false;

    }

    private boolean isResposta(){

        boolean resposta = this.radioGroup.getCheckedRadioButtonId()== -1;
        if(!resposta){

            return true;
        }

        this.pergunta.setError("Selecione a resposta");
        return false;

    }

    @Override
    public boolean onSupportNavigateUp(){
        finish();
        return true;
    }
}

package com.teste.igtiquiz;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import com.teste.igtiquiz.model.Pergunta;
import com.teste.igtiquiz.util.DatabaseHelper;

public class AdicionarPerguntaActivity extends AppCompatActivity {

    private EditText pergunta;
    private RadioGroup radioGroup;
    private Button btSalvar;
    private Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adicionar_pergunta);

        this.toolbar = findViewById(R.id.toolbarCadastroPergunta);
        this.toolbar.setTitle("Cadastrar Pergunta");
        setSupportActionBar(this.toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        this.pergunta = findViewById(R.id.editTextPergunta);
        this.radioGroup = findViewById(R.id.radioButtonGrupo);
        this.btSalvar = findViewById(R.id.btSalvar);

        this.btSalvar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(isPergunta() && isResposta()){

                    pergunta.setError(null);
                    View radioCheckedView = radioGroup.findViewById(radioGroup.getCheckedRadioButtonId());
                    RadioButton rb = (RadioButton) radioGroup.getChildAt(radioGroup.indexOfChild(radioCheckedView));

                    Pergunta per = new Pergunta();
                    per.setPergunta(pergunta.getText().toString());
                    per.setResposta(rb.getText().equals("VERDADEIRA") ? 1 : 0);

                    DatabaseHelper dbh = new DatabaseHelper(AdicionarPerguntaActivity.this);
                    dbh.insertPergunta(per);

                    Toast.makeText(AdicionarPerguntaActivity.this, "Pergunta adicionada com sucesso !!!", Toast.LENGTH_SHORT).show();
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

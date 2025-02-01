package com.teste.igtiquiz;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class ResultActivity extends AppCompatActivity {

    private Toolbar toolbar;
    private Button btVoltar;
    private TextView porcentagemAcerto;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        this.toolbar = findViewById(R.id.toolbarAcentos);
        this.toolbar.setTitle("Resultado");
        setSupportActionBar(this.toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        this.porcentagemAcerto = findViewById(R.id.textViewPorcentagem);
        this.btVoltar = findViewById(R.id.btInicio);

        Bundle dados = getIntent().getExtras();
        if(dados !=null && !dados.isEmpty()){

            int qtdAcertos = dados.getInt("numeroAcertos");
            int qtdPerguntas= dados.getInt("numeroDePerguntas");

            Integer porcentagem = (100 * qtdAcertos) / qtdPerguntas;
            this.porcentagemAcerto.setText(porcentagem.toString()+ "%");
        }

        this.btVoltar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                finish();

            }
        });
    }

    @Override
    public boolean onSupportNavigateUp(){
        finish();
        return true;
    }
}

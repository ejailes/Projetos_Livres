package com.teste.igtiquiz;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.teste.igtiquiz.RecyclerViews.PerguntaQuizAdpater;
import com.teste.igtiquiz.util.ArqPreferencia;
import com.teste.igtiquiz.util.DatabaseHelper;

public class MainActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private PerguntaQuizAdpater perguntaAdpater;
    private DatabaseHelper dbh;
    private Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.toolbar = findViewById(R.id.toolbarMain);
        this.toolbar.setTitle("IGTI Quiz");
        setSupportActionBar(toolbar);

        this.recyclerView = findViewById(R.id.rcvPerguntasQuiz);
        recyclerView.setHasFixedSize(true);

        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        this.dbh = new DatabaseHelper(this);

        perguntaAdpater = new PerguntaQuizAdpater(this, dbh.selectPerguntas());
        perguntaAdpater.setLayoutTemplate(R.layout.cardview_pergunta_quiz);

        this.recyclerView.setAdapter(perguntaAdpater);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;

    }

    @Override
    protected void onRestart() {
        super.onRestart();

        this.perguntaAdpater.resetRadioGroups();

        /*
        Em um app com maior fluxo de dados, este update deve ser melhorado,
        atualmente sempre realiza um select no banco de dados no ciclo onRestart
        da activyty para atualização dos dados;
         */
        this.perguntaAdpater.updateLista(this.dbh.selectPerguntas());
        this.perguntaAdpater.notifyDataSetChanged();

    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        Intent intent = null;

        switch (item.getItemId()) {
            case R.id.config_perguntas:

                intent = new Intent(this, PerguntasActivity.class);
                startActivity(intent);

                return (true);

            case R.id.sair:

                ArqPreferencia preferencias = new ArqPreferencia(this);
                intent = new Intent(this, LoginActivity.class);

                startActivity(intent);
                preferencias.clearPreferencias();
                finish();

                return (true);
        }

        return super.onOptionsItemSelected(item);
    }
}

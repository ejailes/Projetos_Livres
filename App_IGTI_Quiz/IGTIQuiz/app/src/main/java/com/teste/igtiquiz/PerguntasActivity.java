package com.teste.igtiquiz;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.teste.igtiquiz.RecyclerViews.PerguntaAdpater;
import com.teste.igtiquiz.util.DatabaseHelper;

public class PerguntasActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private PerguntaAdpater perguntaAdpater;
    private DatabaseHelper dbh;
    private Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perguntas);

        this.toolbar = findViewById(R.id.toolbarPeguntas);
        this.toolbar.setTitle("Central de Perguntas");
        setSupportActionBar(this.toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setHomeButtonEnabled(true);

        this.recyclerView = findViewById(R.id.rcvPerguntas);
        recyclerView.setHasFixedSize(true);

        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        this.dbh = new DatabaseHelper(this);

        perguntaAdpater = new PerguntaAdpater(this, dbh.selectPerguntas());
        perguntaAdpater.setLayoutTemplate(R.layout.cardview_pergunta);

        this.recyclerView.setAdapter(perguntaAdpater);

    }

    @Override
    protected void onRestart() {
        super.onRestart();

        /*
        Em um app com maior fluxo de dados, este update deve ser melhorado,
        atualmente sempre realiza um select no banco de dados no ciclo onRestart
        para atualização dos dados;
         */

        this.perguntaAdpater.updateLista(this.dbh.selectPerguntas());
        this.perguntaAdpater.notifyDataSetChanged();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        getMenuInflater().inflate(R.menu.menu_pergunta, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()) {

            case R.id.adicionar:

                Intent intent = new Intent(this, AdicionarPerguntaActivity.class);
                startActivity(intent);
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onSupportNavigateUp(){
        finish();
        return true;
    }
}

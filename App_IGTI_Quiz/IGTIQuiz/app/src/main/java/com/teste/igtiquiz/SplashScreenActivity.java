package com.teste.igtiquiz;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import androidx.appcompat.app.AppCompatActivity;

import com.teste.igtiquiz.util.ArqPreferencia;

public class SplashScreenActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        ArqPreferencia preferencias = new ArqPreferencia(this);
        boolean logado = preferencias.isCheckedLembrarSenha();
        if(!logado){
            setTheme(R.style.AppTheme_Splash);
        }

        super.onCreate(savedInstanceState);

        if(!logado){
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    startAct();
                }
            }, this.getTimerRun());
        } else {

            startAct();
        }

    }

    private long getTimerRun() {

        return 1000;
    }

    private void startAct() {

        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
        finish();

    }
}

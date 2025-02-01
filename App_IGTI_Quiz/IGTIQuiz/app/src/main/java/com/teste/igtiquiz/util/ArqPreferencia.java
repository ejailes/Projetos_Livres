package com.teste.igtiquiz.util;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

public class ArqPreferencia {

    private static final String PREFERENCES = "ArqPreferencia";
    private SharedPreferences sharedPreferences;
    private SharedPreferences.Editor editor;

    public ArqPreferencia(Activity act){

        this.sharedPreferences = act.getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        this.editor = this.sharedPreferences.edit();

    }

    public void lembrarSenha(boolean lembrarSenha) {

        this.editor.putBoolean("lembrarSenha", lembrarSenha);
        this.editor.commit();
    }

    public boolean isCheckedLembrarSenha() {

        boolean result = false;
        if (this.sharedPreferences.contains("lembrarSenha")) {

            result = this.sharedPreferences.getBoolean("lembrarSenha", false);
        }

        return result;

    }

    public void clearPreferencias() {

        this.editor.clear();
        this.editor.commit();
    }
}

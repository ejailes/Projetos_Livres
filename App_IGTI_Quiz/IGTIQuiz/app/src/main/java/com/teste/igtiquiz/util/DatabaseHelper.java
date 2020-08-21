package com.teste.igtiquiz.util;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.teste.igtiquiz.model.Pergunta;
import com.teste.igtiquiz.model.User;

import java.util.ArrayList;
import java.util.List;

public class DatabaseHelper extends SQLiteOpenHelper {

    private static final int DATABASE_VERSION = 2;
    private static final String DATABASE_NAME = "dbQuiz";
    private SQLiteDatabase db;

    public DatabaseHelper(Context context) {

        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

        db.execSQL("CREATE TABLE IF NOT EXISTS USER (\n" +
                "IDUSER INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
                "NOME VARCHAR(50) NOT NULL,\n" +
                "EMAIL VARCHAR(50) NOT NULL,\n" +
                "SENHA VARCHAR(50) NOT NULL\n" +
                ");");

        db.execSQL("CREATE TABLE IF NOT EXISTS PERGUNTAS (\n" +
                "IDPERGUNTA INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
                "PERGUNTA VARCHAR(80) NOT NULL,\n" +
                "RESPOSTA BOOLEAN NOT NULL\n" +
                ");");

        this.db = db;
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }

    public void insertUser(User user) {

        this.db = this.getWritableDatabase();

        ContentValues dados = new ContentValues();
        dados.put("NOME", user.getNome());
        dados.put("EMAIL", user.getEmail());
        dados.put("SENHA", user.getPassWord());

        this.db.insert("USER", null, dados);
        this.db.close();
    }

    public List<User> selectUser() {

        List<User> usuarios = new ArrayList<>();

        this.db = this.getWritableDatabase();
        Cursor cursor = this.db.rawQuery("SELECT * FROM USER", null);

        for (boolean loop = cursor.moveToFirst(); loop != false; loop = cursor.moveToNext()) {

            User user = new User();
            user.setNome(cursor.getString(1));
            user.setEmail(cursor.getString(2));
            user.setPassWord(cursor.getString(3));

            usuarios.add(user);

        }

        return usuarios;
    }

    public boolean isUser(User user) {

        this.db = this.getWritableDatabase();
        Cursor cursor = this.db.rawQuery("SELECT NOME FROM USER WHERE EMAIL=" +
                "'" + user.getEmail() + "'" + " AND SENHA=" + "'" + user.getPassWord() + "'"
                , null);

        return cursor.moveToFirst();
    }

    public void insertPergunta(Pergunta pergunta) {

        this.db = this.getWritableDatabase();

        ContentValues dados = new ContentValues();
        dados.put("PERGUNTA", pergunta.getPergunta());
        dados.put("RESPOSTA", pergunta.getResposta());

        this.db.insert("PERGUNTAS", null, dados);
        this.db.close();

    }

    public List<Pergunta> selectPerguntas(){

        List<Pergunta> perguntas = new ArrayList<>();

        this.db = this.getWritableDatabase();
        Cursor cursor = this.db.rawQuery("SELECT * FROM PERGUNTAS", null);

        for (boolean loop = cursor.moveToFirst(); loop != false; loop = cursor.moveToNext()) {

            Pergunta pergunta = new Pergunta();
            pergunta.setId(Integer.parseInt(cursor.getString(0)));
            pergunta.setPergunta(cursor.getString(1));
            pergunta.setResposta(Integer.parseInt(cursor.getString(2)));

            perguntas.add(pergunta);

        }

        return perguntas;

    }

    public void updatePergunta(Pergunta pergunta){

        this.db = this.getWritableDatabase();

        ContentValues cv = new ContentValues();
        cv.put("PERGUNTA", pergunta.getPergunta());
        cv.put("RESPOSTA", pergunta.getResposta());

        this.db.update("PERGUNTAS", cv, "IDPERGUNTA="+pergunta.getId(), null);

    }

    public void deletePergunta(Pergunta pergunta){

        this.db = getWritableDatabase();
        String deleteTable = "IDPERGUNTA="+pergunta.getId();

        this.db.delete("PERGUNTAS", deleteTable, null);

    }

}

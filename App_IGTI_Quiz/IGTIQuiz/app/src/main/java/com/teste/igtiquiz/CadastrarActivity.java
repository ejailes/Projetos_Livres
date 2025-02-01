package com.teste.igtiquiz;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.teste.igtiquiz.model.User;
import com.teste.igtiquiz.util.DatabaseHelper;

public class CadastrarActivity extends AppCompatActivity {

    private EditText nome, email, passWord, confirmarPass;
    private Button btCadastrar;
    private TextView btVoltar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cadastrar);

        this.nome = findViewById(R.id.editTextNome);
        this.email = findViewById(R.id.editTextNovoEmail);
        this.passWord = findViewById(R.id.editTextNovaPassword);
        this.confirmarPass = findViewById(R.id.editTextConfirmaPassword);
        this.btCadastrar = findViewById(R.id.btCadastrar);
        this.btVoltar = findViewById(R.id.textViewVoltarLogin);

        this.btCadastrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(isNome() & isEmail() & isPassWord() & isConfirmePassWord()){

                    if(passWordCheck(passWord.getText().toString(), confirmarPass.getText().toString())){

                        User user = new User();
                        user.setNome(nome.getText().toString());
                        user.setEmail(email.getText().toString());
                        user.setPassWord(passWord.getText().toString());

                        new DatabaseHelper(CadastrarActivity.this).insertUser(user);
                        Toast.makeText(CadastrarActivity.this, "Cadastrado", Toast.LENGTH_SHORT).show();
                        activityLogin();

                    }

                }
            }
        });

        this.btVoltar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                activityLogin();
            }
        });

    }

    private boolean isEmail() {

        if (this.email != null & !this.email.getText().toString().isEmpty() & android.util.Patterns.EMAIL_ADDRESS.matcher(this.email.getText().toString())
                .matches()) {

            return true;
        }

        this.email.setError("E-mail inválido");
        return false;
    }

    private boolean isNome() {

        if (this.nome != null & !this.nome.getText().toString().isEmpty()) {

            return true;
        }

        this.nome.setError("Nome inválido");
        return false;
    }

    private boolean isPassWord() {

        if (this.passWord != null & !this.passWord.getText().toString().isEmpty()) {

            return true;
        }

        this.passWord.setError("Password inválido");
        return false;
    }

    private boolean isConfirmePassWord() {

        if (this.confirmarPass != null & !this.confirmarPass.getText().toString().isEmpty()) {

            return true;
        }

        this.confirmarPass.setError("Confirmar Password inválido");
        return false;
    }

    private boolean passWordCheck(String p1, String p2){

        if(p1.equals(p2)){

            return true;
        }

        this.confirmarPass.setError("Password diferente!");
        return false;

    }

    private void activityLogin(){

        Intent intent = new Intent(CadastrarActivity.this, LoginActivity.class);
        startActivity(intent);
        finish();
    }
}

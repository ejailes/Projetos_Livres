package com.teste.igtiquiz;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.teste.igtiquiz.model.User;
import com.teste.igtiquiz.util.ArqPreferencia;
import com.teste.igtiquiz.util.DatabaseHelper;

public class LoginActivity extends AppCompatActivity {

    private EditText email, passWord;
    private Button btLogin;
    private TextView btCadastrar;
    private CheckBox checkLembrarSenha;
    private ArqPreferencia preferencias;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        this.preferencias = new ArqPreferencia(this);
        this.isLogado();

        this.email = findViewById(R.id.editTextEmail);
        this.passWord = findViewById(R.id.editTextPassword);
        this.btLogin = findViewById(R.id.btLogin);
        this.btCadastrar = findViewById(R.id.textViewCadastrarUser);
        this.checkLembrarSenha = findViewById(R.id.checkBoxLembrarSenha);

        this.btLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (isEmail() & isPassWord()) {

                    User user = new User();
                    DatabaseHelper db = new DatabaseHelper(LoginActivity.this);

                    user.setEmail(email.getText().toString());
                    user.setPassWord(passWord.getText().toString());

                    if (db.isUser(user)) {

                        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                        startActivity(intent);
                        preferencias.lembrarSenha(checkLembrarSenha.isChecked());
                        finish();

                    } else {

                        Toast.makeText(LoginActivity.this, "Usuario ou senha inválidos", Toast.LENGTH_SHORT).show();
                    }

                }
            }
        });

        this.btCadastrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(LoginActivity.this, CadastrarActivity.class);
                startActivity(intent);
                finish();
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

    private boolean isPassWord() {

        if (this.passWord != null && !this.passWord.getText().toString().isEmpty()) {

            return true;
        }

        this.passWord.setError("Password inválido");
        return false;
    }

    private void isLogado() {

        if (preferencias.isCheckedLembrarSenha()) {
            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
        }


    }

}

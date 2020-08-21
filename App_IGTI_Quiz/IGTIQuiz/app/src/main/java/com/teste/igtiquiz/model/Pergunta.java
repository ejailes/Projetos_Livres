package com.teste.igtiquiz.model;

import java.io.Serializable;

public class Pergunta implements Serializable {

    public int id;
    public String pergunta;
    public Integer resposta;

    public void setId(int id) {

        this.id = id;
    }

    public Integer getId(){
        return this.id;
    }
    public String getPergunta() {
        return pergunta;
    }

    public void setPergunta(String pergunta) {
        this.pergunta = pergunta;
    }

    public int getResposta() {
        return resposta;
    }

    public void setResposta(Integer resposta){
        this.resposta = resposta;
    }

    @Override
    public String toString() {
        return "Pergunta{" +
                "pergunta='" + pergunta + '\'' +
                ", resposta=" + resposta +
                '}';
    }
}

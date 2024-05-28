import React from 'react';
import '../organism/styles/ContainerCreateTopics.css';

export default function ContainerCreateTopics() {
  return (
    <section className="container-create-topics">
      <h2 className="letter-theme">Criar Tópico</h2>
      <form className="form-container">
        <div className="form-element">
          <label htmlFor="titulo">Título do Tópico</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Digite o título do tópico"
            className="form-input"
          />
        </div>
        <div className="form-element">
          <label htmlFor="tipo">Tipo de Tópico</label>
          <select id="tipo" name="tipo" className="form-select">
            <option value="" disabled selected>
              Selecione o tipo de tópico
            </option>
            <option value="games">Games</option>
            <option value="tecnológico">Tecnológico</option>
            <option value="cultural">Cultural</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="form-element">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            placeholder="Digite aqui a descrição do tópico"
            rows="6"
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="btn-create-topic">
          Criar Tópico
        </button>
      </form>
    </section>
  );
}

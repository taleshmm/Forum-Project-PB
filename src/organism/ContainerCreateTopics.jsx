export default function ContainerCreateTopics() {
  return (
    <section className="w-full py-8 px-4 h-screen text-white">
      <h2 className="letter-theme text-center text-3xl">Criar Tópico</h2>
      <form className="mt-8 w-full max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="titulo" className="block mb-2">
            Título do Tópico
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Digite o título do tópico"
            className="w-full px-3 py-2 border rounded-lg outline-none text-black focus:border-yellow-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="tipo" className="block mb-2">
            Tipo de Tópico
          </label>
          <select
            id="tipo"
            name="tipo"
            className="w-full px-3 py-2 border rounded-lg outline-none text-black focus:border-yellow-500"
          >
            <option value="" disabled selected>
              Selecione o tipo de tópico
            </option>
            <option value="games">Games</option>
            <option value="tecnológico">Tecnológico</option>
            <option value="cultural">Cultural</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="descricao" className="block mb-2">
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            placeholder="Digite aqui a descrição do tópico"
            rows="6"
            className="w-full px-3 py-2 border rounded-lg outline-none text-black focus:border-yellow-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-base hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg"
        >
          Criar Tópico
        </button>
      </form>
    </section>
  );
}

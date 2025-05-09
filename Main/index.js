const API_ESTADOS = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const API_CIDADES = (uf) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

async function buscar_estados() {
    try {
        const response = await fetch(API_ESTADOS);
        const estadosData = await response.json();

        console.log(estadosData);
        let select = document.getElementById("select_estado");
        estadosData.forEach(estados => {
            let option = document.createElement("option");
            option.value = estados.sigla;
            option.textContent = estados.nome;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Não foi possível achar os estados:", error);
    }
}

async function buscar_cidades(uf) {
    if (uf) {
        try {
            const response = await fetch(API_CIDADES(uf));
            const cidadesData = await response.json();

            console.log(cidadesData);

            cidadesData.sort((a, b) => a.nome.localeCompare(b.nome));

            const selectCidade = document.getElementById("select-cidade");
            selectCidade.innerHTML = "<option value=''>Selecione a cidade</option>";
            cidadesData.forEach(cidade => {
                const option = document.createElement("option");
                option.value = cidade.nome;
                option.textContent = cidade.nome;
                selectCidade.appendChild(option);
            });
        } catch (error) {
            console.error(`Não foi possível achar as cidades do estado ${uf}:`, error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    buscar_estados();

    document.getElementById("select_estado").addEventListener("change", function () {
        const estadoSelecionado = this.value;
        buscar_cidades(estadoSelecionado);
    });
});

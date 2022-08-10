const pokemon_name = document.querySelector('.pokemon_name')
const pokemon_number = document.querySelector('.pokemon_number')
const pokemon_image = document.querySelector('.pokemon_image')


const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const btn_prev = document.querySelector('.btn-prev')
const btn_next = document.querySelector('.btn-next')

let searchPokemon = 1


const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const pokemonData = await APIResponse.json()
        return pokemonData
    }

}


const showPokemon = async (pokemon) => {

    pokemon_name.innerHTML = 'Carregando...'
    pokemon_number.innerHTML = ''

    const pokemonData = await fetchPokemon(pokemon)

    if (pokemonData){

        pokemon_name.innerHTML = pokemonData.name
        pokemon_number.innerHTML = pokemonData.id
        pokemon_image.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    
        input.value = ''
        searchPokemon = pokemonData.id;
    }
    else{
        pokemon_name.innerHTML = 'Não encontrado'
        pokemon_number.innerHTML = ''
        pokemon_image.src = ''
    }


}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    showPokemon(input.value.toLowerCase())
})

btn_prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--
        showPokemon(searchPokemon)
    }
})
btn_next.addEventListener('click', () => {
    searchPokemon +=1
    showPokemon(searchPokemon)
})

showPokemon(searchPokemon)
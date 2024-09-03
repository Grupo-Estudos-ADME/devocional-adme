document.getElementById('searchButton').addEventListener('click', fetchChapter);

function fetchChapter() {
    const token = '';

    const dia = document.getElementById('dia').value.trim();
    const mes = document.getElementById('mes').value.trim();

    if (!dia || !mes) {
        alert('Por favor, preencha dia e mês');
        return;
    }

    

    const devocionais = [
        {
            dia: 1,
            mes: 1,
            livros: [
                {
                    livro: "gn", 
                    capitulo: 1
                },
                {
                    livro: "mt",
                    capitulo: 1
                },
                {
                    livro: "ed",
                    capitulo: 1
                },
                {
                    livro: "at",
                    capitulo: 1
                }
            ]
        },
        {
            dia: 2,
            mes: 1,
            livros: [
                {
                    livro: "gn",
                    capitulo: 2
                },
                {
                    livro: "mt",
                    capitulo: 2
                },
                {
                    livro: "ed",
                    capitulo: 2
                },
                {
                    livro: "at",
                    capitulo: 2
                }
            ]
        },
        {
            dia: 3,
            mes: 1,
            livros: [
                {
                    livro: "gn",
                    capitulo: 3
                },
                {
                    livro: "mt",
                    capitulo: 3
                },
                {
                    livro: "ed",
                    capitulo: 3
                },
                {
                    livro: "at",
                    capitulo: 3
                }
            ]
        }
    ]

    let devocional_busca = null;



    for (const devocional of devocionais) {
        if (devocional.dia == dia && devocional.mes == mes) {
            devocional_busca = devocional;
            break;
        }
    }


    if (devocional_busca != null) {
        const verseBox = document.getElementById('verseBox');
        verseBox.innerHTML = ''; // Limpa o conteúdo anterior
        for (const leitura of devocional_busca.livros) {

            fetch(`https://www.abibliadigital.com.br/api/verses/acf/${leitura.livro}/${leitura.capitulo}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((data) => {
                    const title = document.createElement('h2');

                    title.textContent = `${data.book.name} ${data.chapter.number}`;
                    verseBox.appendChild(title);
                    for (verse of data.verses) {
                        const verseElement = document.createElement('p');
                        verseElement.textContent = `${verse.number}. ${verse.text}`;
                        verseBox.appendChild(verseElement);
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao buscar o capítulo. Verifique os dados e tente novamente.');
                });


        }
    }


}

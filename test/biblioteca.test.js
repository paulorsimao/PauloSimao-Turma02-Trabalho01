const Biblioteca = require('../src/biblioteca');

describe('Testes da classe Biblioteca', () => {
    let biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
        biblioteca.adicionarLivro({ id: 1, titulo: 'Percy Jackson', autor: 'Rick Riordan', genero: 'Fantasia', ano: 1999 });
        biblioteca.adicionarLivro({ id: 2, titulo: 'Harry Potter', autor: 'J.K. Rowling', genero: 'Fantasia', ano: 1988 });
        biblioteca.adicionarMembro({ id: 1, nome: 'Leandro' });
        biblioteca.adicionarMembro({ id: 2, nome: 'Leandra' });
    });

    test('Deve adicionar um livro corretamente', () => {
        biblioteca.adicionarLivro({ id: 3, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', genero: 'Fantasia', ano: 1937 });
        expect(biblioteca.listarLivros().length).toBe(3);
    });

    test('Deve remover um livro corretamente', () => {
        biblioteca.removerLivro(1);
        expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
    });

    test('Deve buscar um livro por ID corretamente', () => {
        const livro = biblioteca.buscarLivroPorId(1);
        expect(livro).toEqual({ id: 1, titulo: 'Percy Jackson', autor: 'Rick Riordan', genero: 'Fantasia', ano: 1999 });
    });

    test('Deve buscar livros por título corretamente', () => {
        const livros = biblioteca.buscarLivroPorTitulo('Percy');
        expect(livros).toEqual([
            { id: 1, titulo: 'Percy Jackson', autor: 'Rick Riordan', genero: 'Fantasia', ano: 1999 }
        ]);
    });

    test('Deve buscar livros por autor corretamente', () => {
        const livros = biblioteca.listarLivrosPorAutor('Rick Riordan');
        expect(livros).toEqual([
            { id: 1, titulo: 'Percy Jackson', autor: 'Rick Riordan', genero: 'Fantasia', ano: 1999 }
        ]);
    });

    test('Deve emprestar um livro corretamente', () => {
        const sucesso = biblioteca.emprestarLivro(1, 1);
        expect(sucesso).toBe(true);
        expect(biblioteca.buscarLivroPorId(1).emprestado).toBe(true);
    });

    test('Não deve emprestar um livro que já está emprestado', () => {
        biblioteca.emprestarLivro(1, 1);
        const sucesso = biblioteca.emprestarLivro(1, 2);
        expect(sucesso).toBe(false);
    });

    test('Não deve emprestar um livro para um membro inexistente', () => {
        const sucesso = biblioteca.emprestarLivro(1, 3);
        expect(sucesso).toBe(false);
    });

    test('Não deve emprestar um livro que não existe', () => {
        const sucesso = biblioteca.emprestarLivro(3, 1);
        expect(sucesso).toBe(false);
    });

    test('Deve devolver um livro corretamente', () => {
        biblioteca.emprestarLivro(1, 1);
        const sucesso = biblioteca.devolverLivro(1);
        expect(sucesso).toBe(true);
        expect(biblioteca.buscarLivroPorId(1).emprestado).toBe(false);
    });

    test('Não deve devolver um livro que não está emprestado', () => {
        const sucesso = biblioteca.devolverLivro(2);
        expect(sucesso).toBe(false);
    });

    test('Deve listar livros emprestados corretamente', () => {
        biblioteca.emprestarLivro(1, 1);
        const emprestados = biblioteca.listarLivrosEmprestados();
        expect(emprestados.length).toBe(1);
        expect(emprestados[0].id).toBe(1);
    });

    test('Deve listar livros disponíveis corretamente', () => {
        biblioteca.emprestarLivro(1, 1);
        const disponiveis = biblioteca.listarLivrosDisponiveis();
        expect(disponiveis.length).toBe(1);
        expect(disponiveis[0].id).toBe(2);
    });

    test('Deve contar o número de livros corretamente', () => {
        expect(biblioteca.contarLivros()).toBe(2);
    });

    test('Deve contar o número de membros corretamente', () => {
        expect(biblioteca.contarMembros()).toBe(2);
    });

    test('Deve listar livros por gênero corretamente', () => {
        const livros = biblioteca.listarLivrosPorGenero('Fantasia');
        expect(livros).toEqual([
            { id: 1, titulo: 'Percy Jackson', autor: 'Rick Riordan', genero: 'Fantasia', ano: 1999 },
            { id: 2, titulo: 'Harry Potter', autor: 'J.K. Rowling', genero: 'Fantasia', ano: 1988 }
        ]);
    });

    test('Deve atualizar as informações de um livro corretamente', () => {
        biblioteca.atualizarInformacaoLivro(1, { titulo: 'Percy Jackson e o Ladrão de Raios', ano: 1999 });
        const livro = biblioteca.buscarLivroPorId(1);
        expect(livro.titulo).toBe('Percy Jackson e o Ladrão de Raios');
        expect(livro.ano).toBe(1999);
    });

    test('Não deve atualizar um livro com dados inválidos', () => {
        biblioteca.atualizarInformacaoLivro(1, { ano: 'ano inválido' });
        const livro = biblioteca.buscarLivroPorId(1);
        expect(livro.ano).toBe(1999);  
    });

    test('Deve listar livros por ano corretamente', () => {
        const livros = biblioteca.listarLivrosPorAno(1999);
        expect(livros).toEqual([
            { id: 1, titulo: 'Percy Jackson', autor: 'Rick Riordan', genero: 'Fantasia', ano: 1999 }
        ]);
    });

    test('Deve remover um membro corretamente', () => {
        biblioteca.removerMembro(1);
        expect(biblioteca.buscarMembroPorId(1)).toBeUndefined();
    });

    test('Deve atualizar informações de um membro corretamente', () => {
        biblioteca.adicionarMembro({ id: 3, nome: 'Leandrinho' });
        biblioteca.atualizarInformacaoMembro(3, { nome: 'Leandrinho da Silva' });
        const membro = biblioteca.buscarMembroPorId(3);
        expect(membro.nome).toBe('Leandrinho da Silva');
    });
});
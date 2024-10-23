const mysql = require('../mysql').pool;

exports.getPedidos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      `SELECT pedidos.id_pedidos,
			        pedidos.quantidade,		
					    produtos.idprodutos,
              produtos.nome,
              produtos.preco
				 FROM pedidos
	 INNER JOIN produtos
				   ON produtos.idprodutos = pedidos.id_pedidos;`,
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }
        const response = {
          pedidos: result.map((pedido) => {
            return {
              id_pedidos: pedido.id_pedidos,
              quantidade: pedido.quantidade,
              produto: {
                id_produto: pedido.id_produto,
                nome: pedido.nome,
                preco: pedido.preco,
              },
              request: {
                tipo: 'GET',
                descricao: 'Retorna os detalhes de um pedido específico',
                url: 'http://localhost:3000/pedidos/' + pedido.id_pedidos,
              },
            };
          }),
        };
        return res.status(200).send(response);
      },
    );
  });
};

exports.postPedidos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      'SELECT * FROM produtos WHERE idprodutos = ?',
      [req.body.id_produto],
      (error, result, field) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }
        if (result.length == 0) {
          return res.status(404).send({
            mensagem: 'Produto não encontrado',
          });
        }
        conn.query(
          'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)',
          [req.body.id_produto, req.body.quantidade],
          (error, result, fields) => {
            conn.release();
            if (error) {
              return res.status(500).send({
                error: error,
              });
            }
            const response = {
              mensagem: 'Pedido inserido com sucesso',
              pedidoCriado: {
                idpedidos: result.id_pedidos,
                idproduto: req.body.id_produto,
                quantidade: req.body.quantidade,
                request: {
                  tipo: 'GET',
                  descricao: 'Retorna todos os pedidos',
                  url: 'http://localhost:3000/pedidos',
                },
              },
            };
            return res.status(200).send(response);
          },
        );
      },
    );
  });
};

exports.getUmPedido = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'SELECT * FROM pedidos WHERE id_pedidos = ?',
      [req.params.id_pedido],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res.status(404).send({
            mensagem: 'Não foi encontrado pedido com este ID',
          });
        }
        const response = {
          pedido: {
            idpedido: result[0].id_pedido,
            idproduto: result[0].id_produtos,
            quantidade: result[0].quantidade,
            request: {
              tipo: 'GET',
              descricao: 'Retorna todos os pedidos',
              url: 'http://localhost:3000/pedidos',
            },
          },
        };
        return res.status(200).send(response);
      },
    );
  });
};

exports.pedidoDelete = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `DELETE FROM pedidos WHERE id_pedidos = ?`,
      [req.body.idprodutos],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: 'Pedido removido com sucesso',
          request: {
            tipo: 'POST',
            descricao: 'insere um pedido',
            url: 'http://localhost:3000/pedidos',
            body: {
              id_produto: 'Number',
              quantidade: 'Number',
            },
          },
        };
        return res.status(202).send(response);
      },
    );
  });
};

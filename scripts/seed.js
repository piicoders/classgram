import { db } from 'api/src/lib/db'

export default async () => {
  try {
    console.log(
      "\nUsing the default './scripts/seed.js' template\nEdit the file to add seed data\n"
    )

    const userData = [
      {
        name: 'Francilene Garcia',
        email: 'francilene@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'P',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Milene Bazarim',
        email: 'milene@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'P',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Jhon doe',
        email: 'professor0@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'P',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Michaela Bauer',
        email: 'professor1@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'P',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Alfredo Andrade',
        email: 'alfredo@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'S',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Anthony Ferreira',
        email: 'anthony@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'S',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Bruno Grangeiro',
        email: 'bruno@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'S',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Diego de Lima',
        email: 'diego@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'S',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Gabriel Vasconcelos',
        email: 'gabriel@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'S',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Paulo Victor',
        email: 'paulin@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'S',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Laura Simpson',
        email: 'student0@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'S',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
      {
        name: 'Carolyn Bowen',
        email: 'student1@test.com',
        hashedPassword:
          '6b30041b820f236f7f6d5c93b5bd8e5ea84af9ebe4de4e510bf11314df2671bb|16384|8|1',
        salt: 'd337c5807454b4f79eb6cdcbd34f8a1273e68e49fdfc35bb8e51e99def76b23e',
        roles: 'S',
        resetToken: null,
        resetTokenExpiredAt: null,
      },
    ]

    if ((await db.user.count()) === 0) {
      await db.user.createMany({ data: userData })
      console.log('Users added')
    } else {
      console.log('Users already seeded')
    }

    const users = await db.user.findMany()
    const classData = [
      {
        name: 'Escrevendo com Persuasão',
        code: 'su09n',
        professorId: users[2].id,
      },
      { name: 'Redação em Foco', code: '22222', professorId: users[3].id },
      {
        name: 'Desenvolvendo Textos Eficientes',
        code: 'pvi2j',
        professorId: users[2].id,
      },
      {
        name: 'A Arte da Comunicação Escrita',
        code: '32ks9',
        professorId: users[3].id,
      },
      {
        name: 'Prática de Escrita Criativa',
        code: '1f07s',
        professorId: users[2].id,
      },
      {
        name: 'Escrevendo com Clareza e Coerência',
        code: 'tzhc2',
        professorId: users[3].id,
      },
      { name: 'Oficina de Redação', code: '77777', professorId: users[2].id },
      {
        name: 'Laboratório de Textos',
        code: 'iduj8',
        professorId: users[3].id,
      },
      {
        name: 'Aprimorando sua Expressão Escrita',
        code: 'bwz4o',
        professorId: users[2].id,
      },
      {
        name: 'Roteiros para Palavras: Curso de Redação',
        code: 'ip0zr',
        professorId: users[3].id,
      },
    ]

    if ((await db.classroom.count()) === 0) {
      await db.classroom.createMany({ data: classData })
      const classes = await db.classroom.findMany()

      for (let i = 0; i < 5; i++) {
        await db.classroom.update({
          where: { id: classes[i].id },
          data: {
            students: {
              connect: [
                { id: users[10].id },
                { id: users[4].id },
                { id: users[5].id },
                { id: users[6].id },
                { id: users[7].id },
                { id: users[8].id },
                { id: users[9].id },
              ],
            },
          },
        })
      }

      for (let j = 5; j < 10; j++) {
        await db.classroom.update({
          where: { id: classes[j].id },
          data: {
            students: {
              connect: [
                { id: users[11].id },
                { id: users[4].id },
                { id: users[5].id },
                { id: users[6].id },
                { id: users[7].id },
                { id: users[8].id },
                { id: users[9].id },
              ],
            },
          },
        })
      }
      console.log('Classes added')
    } else {
      console.log('Classes already seeded')
    }

    const promptData = [{ description: 'Redação' }]

    if ((await db.prompt.count()) === 0) {
      await db.prompt.createMany({ data: promptData })
      console.log('Prompts added')
    } else {
      console.log('Prompts already seeded')
    }

    const promptId = (await db.prompt.findFirst()).id

    const criterionData = [
      { name: 'Argumentação e coerência', promptId: promptId },
      { name: 'Atendimento ao gênero/Tipo', promptId: promptId },
      { name: 'Compreensão do tema', promptId: promptId },
      { name: 'Domínio da modalidade de escrita formal', promptId: promptId },
      { name: 'Recursos coesivos', promptId: promptId },
    ]

    if ((await db.criterion.count()) === 0) {
      await db.criterion.createMany({ data: criterionData })
      console.log('Criteria added')
    } else {
      console.log('Criteria already seeded')
    }

    const criteria = await db.criterion.findMany()
    const subFactorData = [
      {
        name: 'Acumulo de argumentos',
        description:
          'Evite a acumulação de argumentos, muitas vezes pouco explorados ou mal desenvolvidos. Prefira apresentar um número menor de argumentos e dedicar mais tempo a explorá-los detalhadamente.',
        criterionId: criteria[0].id,
      },
      {
        name: 'Argumentação frágil/precária',
        description:
          'É essencial fundamentar de forma mais sólida o seu ponto de vista, pois observa-se uma argumentação frágil ou precária.',
        criterionId: criteria[0].id,
      },
      {
        name: 'Desenvolva melhor o argumento',
        description:
          'Além de simplesmente apontar, é necessário desenvolver adequadamente cada argumento, oferecendo explicações mais elaboradas e exemplos relevantes.',
        criterionId: criteria[0].id,
      },
      {
        name: 'Desenvolva um argumento por parágrafo',
        description:
          'Dê preferência a desenvolver um único argumento ou ideia por parágrafo, permitindo uma análise mais aprofundada e coesa.',
        criterionId: criteria[0].id,
      },
      {
        name: 'Evite argumentação emocional',
        description:
          'Evite apelos emocionais em sua escrita, priorizando uma abordagem racional e objetiva.',
        criterionId: criteria[0].id,
      },
      {
        name: 'Evite texto predominantemente expositivo',
        description:
          'Seu texto deveria ser predominantemente argumentativo, porém há uma predominância de exposição de informações. É importante revisar esse aspecto.',
        criterionId: criteria[0].id,
      },
      {
        name: 'Falta coerência textual',
        description:
          'Faltou coerência textual em algumas partes do seu texto, o que prejudica a compreensão e a fluidez da leitura.',
        criterionId: criteria[0].id,
      },
      {
        name: 'Falta objetividade',
        description:
          'Seja mais objetivo em sua escrita, evitando divagações ou excesso de detalhes que não contribuam para o desenvolvimento do tema.',
        criterionId: criteria[0].id,
      },

      {
        name: 'Evite texto predominantemente expositivo',
        description:
          'Verifique se o texto está de acordo com o tipo textual adequado. Narrar é contar uma história, dissertar é discutir um assunto e descrever é detalhar pessoas, ambientes ou objetos.',
        criterionId: criteria[1].id,
      },
      {
        name: 'Faltou título',
        description:
          'Reconsidere as noções básicas do texto dissertativo-argumentativo, garantindo uma estruturação e argumentação adequadas.',
        criterionId: criteria[1].id,
      },
      {
        name: 'Inadequação ao tipo textual',
        description:
          'Procure abordar todas as palavras-chave do tema proposto, garantindo uma análise completa e abrangente.',
        criterionId: criteria[1].id,
      },
      {
        name: 'Não atendimento ao gênero',
        description:
          'Aprimore a apresentação do tema, fornecendo uma introdução clara e relevante para contextualizar a discussão.',
        criterionId: criteria[1].id,
      },

      {
        name: 'Aborde todas as palavras-chave do tema',
        description:
          'Parte significativa do seu texto parece ter sido copiada de outras fontes, o que compromete a originalidade e autenticidade da sua produção.',
        criterionId: criteria[2].id,
      },
      {
        name: 'Apresente melhor o tema',
        description:
          'Houve um desvio do tema ao longo do texto, o que demonstra falta de foco e coesão na argumentação.',
        criterionId: criteria[2].id,
      },
      {
        name: 'Cópia',
        description:
          'Evite parafrasear excessivamente os textos de apoio, priorizando uma abordagem mais autêntica e original.',
        criterionId: criteria[2].id,
      },
      {
        name: 'Desvio do tema',
        description:
          'Verifica-se que sua redação fugiu do tema proposto, o que pode resultar em perda de pontos na avaliação.',
        criterionId: criteria[2].id,
      },
      {
        name: 'Evite parafrasear os textos de apoio',
        description:
          'Certifique-se de responder adequadamente à pergunta-tema, mantendo o foco e a relevância ao longo do texto.',
        criterionId: criteria[2].id,
      },
      {
        name: 'Fuga ao tema',
        description:
          'Observa-se uma abordagem incompleta ou insuficiente do tema, o que sugere uma análise superficial ou superficial.',
        criterionId: criteria[2].id,
      },
      {
        name: 'Responda à pergunta-tema',
        description:
          'Utilize corretamente as expressões "a fim de" e "afim", garantindo precisão e clareza na comunicação.',
        criterionId: criteria[2].id,
      },
      {
        name: 'Tangencimaneto/Abordagem superficial do tema',
        description:
          'Atente-se ao uso correto de acentos, garantindo a precisão e correção ortográfica das palavras.',
        criterionId: criteria[2].id,
      },

      {
        name: 'A fim de e afim',
        description:
          'Evite erros na colocação do acento, verificando cuidadosamente as regras de acentuação gráfica.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Acerto incorreto',
        description:
          'É necessário utilizar corretamente a pontuação, incluindo vírgulas, pontos finais e demais sinais, para garantir a clareza e fluidez da escrita.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Acentuação - acento na sílaba errada',
        description:
          'Revise o uso de aspas, empregando-as apenas quando necessário e de acordo com as convenções linguísticas.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Acentuação - falta acento',
        description:
          'Relembre as regras de concordância nominal, garantindo a concordância adequada entre os elementos da frase.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Acentuação - não acentue',
        description:
          'Revise as regras de concordância verbal, assegurando que o verbo concorde corretamente com o sujeito em número e pessoa.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Ah!, há, à, a',
        description:
          'Procure construir frases de forma mais clara e precisa, evitando ambiguidades ou estruturas confusas.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Amplie o vocabulário',
        description:
          'Utilize corretamente o acento indicador de crase, observando as situações em que ele é necessário e evitando seu uso indevido.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Artigo - falta',
        description:
          'Evite o uso excessivo de reticências, "etc." e abreviações, empregando-os com moderação para não comprometer a formalidade do texto.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Aspas',
        description:
          'Varie o uso de conectivos para garantir a coesão entre os parágrafos e evitar repetições desnecessárias.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Aspas desnecessárias',
        description:
          'Evite períodos longos, pois dificultam a compreensão e podem tornar a leitura cansativa para o leitor.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Concordância nominal',
        description:
          'Busque aprimorar a concisão textual, transmitindo as informações de forma clara e sucinta, sem excessos desnecessários.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Concordância verbal',
        description:
          'Evite parágrafos compostos por uma única frase ou oração, buscando uma estruturação mais equilibrada e coesa.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Construa melhor a frase',
        description:
          'Cuide do uso adequado de "onde" e "aonde", garantindo sua aplicação correta de acordo com o contexto.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Crase - falta',
        description:
          'Evite o excesso de repetição da palavra "que", buscando diversificar o vocabulário e a estrutura das frases.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Crase - não use',
        description:
          'Mantenha a atenção à precisão vocabular, utilizando termos adequados e específicos para transmitir suas ideias.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Evite as abreviações, as reticências e o etc.',
        description:
          'Evite incorreções na ortografia, consultando o dicionário sempre que necessário para esclarecer dúvidas.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Excesso da conjunção "e"',
        description:
          'Corrija o uso incorreto de "mim", garantindo sua aplicação adequada de acordo com as regras gramaticais.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Falta precisão vocabular',
        description:
          'Verifique o uso adequado de pontos finais, garantindo que cada frase seja devidamente finalizada.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Gerundismo',
        description:
          'Revise o uso de pontuação, garantindo sua aplicação correta para garantir a clareza e coesão do texto.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Linguagem formal, informal e gíria',
        description:
          'Consulte as regras de acentuação para os diferentes tipos de "porquês", garantindo sua aplicação correta de acordo com o contexto.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Maiúsculas e minúsculas',
        description:
          'Evite rasuras, optando por corrigir erros de forma limpa e legível para garantir a apresentação adequada do texto.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Mal e mau',
        description:
          'Realize uma revisão minuciosa do texto antes de entregá-lo, verificando aspectos como legibilidade, ortografia, concordância e pontuação.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Margens e alinhamento de parágrafos',
        description:
          'Ajuste o texto para ocupar toda a extensão da linha, evitando ultrapassar ou deixar espaços em branco na margem.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Mas - mais - más',
        description:
          'Não confunda "traz" com "trás", utilizando cada termo de acordo com seu significado e contexto específico.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Meio - advérbio ou numeral?',
        description:
          'Utilize corretamente o verbo "assistir", empregando a preposição adequada de acordo com o sentido da frase.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Muito - advérbio ou pronome',
        description:
          'Lembre-se das regras de uso do verbo "fazer" de forma impessoal, de acordo com o contexto em que é empregado.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Numerais',
        description:
          'Utilize corretamente o verbo "haver" no sentido de existir, observando sua forma no singular independentemente do número de elementos.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Ortografia',
        description:
          'Empregue corretamente a partícula "a" ao construir frases com o verbo "preferir", evitando expressões inadequadas.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Para mim ou para eu?',
        description:
          'Verifique a utilização adequada de vírgulas, garantindo sua aplicação de acordo com as regras gramaticais.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Ponto final - falta',
        description:
          'Mantenha a coerência na utilização de vírgulas, evitando seu uso indevido ou desnecessário.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Pontuação inadequada',
        description:
          'Revise a coesão entre os parágrafos, utilizando conectivos de forma adequada para manter a fluidez do texto.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Porquês',
        description:
          'Evite repetições excessivas de conectivos, buscando diversificar sua utilização para melhorar a fluidez da escrita.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Rasuras',
        description:
          'Atente-se à concisão textual, evitando períodos longos que podem dificultar a compreensão do texto.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Revise seu texto',
        description:
          'Busque expressar suas ideias de forma sucinta e precisa, evitando o uso de palavras ou frases desnecessárias.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Translineação e separação silábica',
        description:
          'Evite construir parágrafos com apenas uma frase ou oração, buscando uma estruturação mais equilibrada e coesa.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Traz - trás',
        description:
          'Lembre-se das distinções entre "onde" e "aonde", utilizando cada termo de acordo com o contexto específico.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Verbo "assistir"',
        description:
          'Reduza o uso excessivo da palavra "que", buscando diversificar o vocabulário e a estrutura das frases.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Verbo "fazer" concordância',
        description:
          'Mantenha a precisão vocabular, utilizando termos adequados e específicos para transmitir suas ideias de forma clara.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Verbo "haver" concordância',
        description:
          'Verifique a ortografia das palavras, consultando o dicionário sempre que necessário para esclarecer dúvidas.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Verbo "preferir"',
        description:
          'Corrija o uso incorreto de "mim", garantindo sua aplicação adequada de acordo com as regras gramaticais.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Vírgula - falta',
        description:
          'Revise o texto para garantir o uso correto da pontuação, o que contribui para a clareza e fluidez da leitura.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Vírgula - inadequada',
        description:
          'Consulte as regras de acentuação para os diferentes tipos de "porquês", garantindo sua aplicação correta de acordo com o contexto.',
        criterionId: criteria[3].id,
      },
      {
        name: 'Vírgula - não separe sujeito e verbo',
        description:
          'Evite rasuras, optando por corrigir erros de forma limpa e legível para garantir a apresentação adequada do texto.',
        criterionId: criteria[3].id,
      },

      {
        name: 'Coesão interparágrafos falta domínio',
        description:
          'Realize uma revisão minuciosa do texto antes de entregá-lo, verificando aspectos como legibilidade, ortografia, concordância e pontuação.',
        criterionId: criteria[4].id,
      },
      {
        name: 'Diversifique o conectivo',
        description:
          'Ajuste o texto para ocupar toda a extensão da linha, evitando ultrapassar ou deixar espaços em branco na margem.',
        criterionId: criteria[4].id,
      },
      {
        name: 'Evite período longo',
        description:
          'Não confunda "traz" com "trás", utilizando cada termo de acordo com seu significado e contexto.',
        criterionId: criteria[4].id,
      },
      {
        name: 'Falta concisão textual',
        description:
          'Utilize corretamente o verbo "assistir", empregando a preposição adequada de acordo com o sentido da frase.',
        criterionId: criteria[4].id,
      },
      {
        name: 'Não construa parágrafos de uma só frase',
        description:
          'Lembre-se das regras de uso do verbo "fazer" de forma impessoal, de acordo com o contexto em que é empregado.',
        criterionId: criteria[4].id,
      },
      {
        name: 'Onde e Aonde',
        description:
          'Utilize corretamente o verbo "haver" no sentido de existir, observando sua forma no singular independentemente do número de elementos.',
        criterionId: criteria[4].id,
      },
      {
        name: 'Queísmo',
        description:
          'Empregue corretamente a partícula "a" ao construir frases com o verbo "preferir", evitando expressões inadequadas.',
        criterionId: criteria[4].id,
      },
      {
        name: 'Repetições',
        description:
          'Verifique a utilização adequada de vírgulas, garantindo sua aplicação de acordo com as regras gramaticais.',
        criterionId: criteria[4].id,
      },
    ]

    if ((await db.subfactor.count()) === 0) {
      await db.subfactor.createMany({ data: subFactorData })
      console.log('Subfactors added')
    } else {
      console.log('Subfactors already seeded')
    }

    const classrooms = await db.classroom.findMany()
    const day_1 = new Date()
    day_1.setDate(new Date().getDate() + 1)
    const day_2 = new Date()
    day_2.setDate(new Date().getDate() + 2)
    const day_3 = new Date()
    day_3.setDate(new Date().getDate() + 3)
    const day_4 = new Date()
    day_4.setDate(new Date().getDate() + 4)
    const activityData = [
      {
        name: 'A importância da leitura na formação do cidadão',
        description:
          'A habilidade de ler é uma das mais fundamentais na vida de qualquer indivíduo. Além de proporcionar acesso ao conhecimento, a leitura tem o poder de ampliar horizontes, desenvolver o pensamento crítico e estimular a empatia. Desde cedo, quando somos apresentados às primeiras letras, a leitura nos acompanha em todas as fases da vida, moldando nossa visão de mundo e contribuindo para a nossa formação como cidadãos conscientes e ativos na sociedade. Nesta atividade, vamos explorar a importância da leitura e como ela influencia positivamente a formação de cada um de nós.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 10000,
        promptId: promptId,
        classroomId: classrooms[0].id,
      },

      {
        name: 'Os desafios da educação inclusiva nas escolas',
        description:
          'A educação inclusiva é um direito fundamental de todos os cidadãos, independentemente de suas condições físicas, mentais, sociais ou econômicas. No entanto, implementar práticas inclusivas nas escolas apresenta diversos desafios, desde a adaptação do currículo até a formação adequada dos professores. Nesta atividade, vamos explorar os principais obstáculos enfrentados pela educação inclusiva e discutir maneiras de superá-los, visando garantir a todos os alunos o acesso a uma educação de qualidade.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 11000,
        promptId: promptId,
        classroomId: classrooms[1].id,
      },
      {
        name: 'O impacto das redes sociais na vida dos jovens',
        description:
          'As redes sociais se tornaram uma parte inseparável da vida dos jovens na era digital. Por um lado, elas proporcionam conexões instantâneas e facilitam o compartilhamento de informações e experiências. Por outro lado, também podem influenciar negativamente a autoestima, promover o isolamento social e até mesmo contribuir para o cyberbullying. Nesta atividade, vamos analisar o impacto das redes sociais na vida dos jovens, destacando os aspectos positivos e negativos dessa influência e discutindo formas saudáveis de utilizá-las.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 12000,
        promptId: promptId,
        classroomId: classrooms[1].id,
      },
      {
        name: 'A importância da preservação do meio ambiente',
        description:
          'O meio ambiente é o nosso maior patrimônio, fornecendo os recursos naturais essenciais para a nossa sobrevivência e bem-estar. No entanto, a ação humana irresponsável tem causado danos irreparáveis aos ecossistemas, colocando em risco a biodiversidade e o equilíbrio do planeta. Nesta atividade, vamos abordar a importância da preservação do meio ambiente, discutindo as principais ameaças à natureza e destacando a necessidade de ações individuais e coletivas para protegermos o nosso lar comum.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 13000,
        promptId: promptId,
        classroomId: classrooms[1].id,
      },

      {
        name: 'O papel da mulher na sociedade contemporânea',
        description:
          'Ao longo da história, as mulheres têm enfrentado desafios e lutas pela igualdade de direitos em uma sociedade predominantemente patriarcal. No entanto, nos últimos séculos, temos testemunhado avanços significativos na conquista de espaços e na superação de estereótipos de gênero. Nesta atividade, vamos refletir sobre o papel da mulher na sociedade contemporânea, destacando suas conquistas, desafios e contribuições em diversos campos, desde a política até a ciência e a cultura.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 14000,
        promptId: promptId,
        classroomId: classrooms[2].id,
      },
      {
        name: 'A importância da prática regular de atividades físicas',
        description:
          'A prática regular de atividades físicas é essencial para manter a saúde e o bem-estar em dia. Além de fortalecer o corpo, o exercício físico também contribui para a saúde mental, reduzindo o estresse e melhorando o humor. Nesta atividade, vamos explorar os benefícios das atividades físicas para a saúde, discutindo diferentes modalidades esportivas e incentivando a adoção de um estilo de vida ativo e saudável.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 15000,
        promptId: promptId,
        classroomId: classrooms[2].id,
      },
      {
        name: 'O impacto da tecnologia na vida moderna',
        description:
          'A tecnologia tem revolucionado todos os aspectos da vida moderna, desde a forma como nos comunicamos até como trabalhamos e nos divertimos. No entanto, esse avanço tecnológico também levanta questões importantes sobre privacidade, segurança e equidade. Nesta atividade, vamos analisar o impacto da tecnologia na vida moderna, discutindo seus benefícios e desafios e refletindo sobre o papel da sociedade na regulação e uso responsável das novas tecnologias.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 16000,
        promptId: promptId,
        classroomId: classrooms[2].id,
      },
      {
        name: 'A importância da alimentação saudável para a qualidade de vida',
        description:
          'Uma alimentação saudável é a base para uma vida equilibrada e cheia de energia. Consumir uma variedade de alimentos nutritivos não só ajuda a prevenir doenças, como também melhora a disposição e o funcionamento do organismo. Nesta atividade, vamos explorar os princípios de uma alimentação saudável, destacando a importância de escolhas conscientes e hábitos alimentares equilibrados para manter a qualidade de vida em todas as fases da vida.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 17000,
        promptId: promptId,
        classroomId: classrooms[2].id,
      },
      {
        name: 'Os desafios da mobilidade urbana sustentável',
        description:
          'O crescimento acelerado das cidades tem gerado uma série de desafios relacionados à mobilidade urbana, como congestionamentos, poluição do ar e falta de infraestrutura para pedestres e ciclistas. Nesta atividade, vamos discutir os desafios da mobilidade urbana sustentável, explorando alternativas de transporte público eficientes e incentivando o uso de meios de locomoção mais sustentáveis, como bicicletas e transporte coletivo.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 18000,
        promptId: promptId,
        classroomId: classrooms[2].id,
      },

      {
        name: 'O papel da arte na sociedade',
        description:
          'A arte desempenha um papel fundamental na sociedade, refletindo e questionando valores, emoções e ideias. Além de expressar a criatividade humana, a arte também promove a reflexão e o diálogo intercultural, contribuindo para a construção de uma sociedade mais inclusiva e plural. Nesta atividade, vamos explorar o papel da arte na sociedade, analisando diferentes formas de expressão artística e seu impacto na vida das pessoas e das comunidades.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 19000,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'Os desafios da segurança pública no Brasil',
        description:
          'A segurança pública é um desafio constante em muitos países, incluindo o Brasil. O aumento da violência urbana, o tráfico de drogas e a corrupção são apenas alguns dos problemas que afetam a segurança e o bem-estar da população. Nesta atividade, vamos discutir os desafios da segurança pública no Brasil, analisando suas causas e consequências e propondo soluções para reduzir a criminalidade e promover a paz social.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 11100,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'A importância da educação financeira para jovens',
        description:
          'A educação financeira é fundamental para preparar os jovens para lidar com as finanças pessoais de forma responsável e consciente. Compreender conceitos básicos como orçamento, poupança e investimento desde cedo pode fazer toda a diferença na construção de uma vida financeira sólida e próspera. Nesta atividade, vamos abordar a importância da educação financeira para os jovens, fornecendo ferramentas e orientações para que possam tomar decisões financeiras informadas e planejar seu futuro com segurança.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 11200,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'Os impactos da globalização na cultura local',
        description:
          'A globalização tem aproximado culturas e povos de todo o mundo, facilitando o intercâmbio de ideias, produtos e valores. No entanto, esse processo também levanta questões sobre a preservação da identidade cultural e o respeito à diversidade. Nesta atividade, vamos discutir os impactos da globalização na cultura local, explorando os desafios e oportunidades que surgem dessa interação entre o global e o local.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 11300,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'O combate ao trabalho infantil',
        description:
          'O trabalho infantil é uma realidade trágica que priva milhões de crianças ao redor do mundo de sua infância e oportunidades de educação e desenvolvimento. Erradicar o trabalho infantil requer um esforço conjunto da sociedade, governos e organizações internacionais para garantir que todas as crianças tenham acesso a uma educação de qualidade e a um ambiente seguro e acolhedor. Nesta atividade, vamos discutir estratégias para combater o trabalho infantil e promover os direitos das crianças em todo o mundo.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 11400,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'A importância da igualdade de gênero no mercado de trabalho',
        description:
          'Apesar dos avanços conquistados nas últimas décadas, a igualdade de gênero no mercado de trabalho ainda é um objetivo a ser alcançado em muitos países. Disparidades salariais, falta de oportunidades de ascensão profissional e discriminação são apenas alguns dos desafios enfrentados pelas mulheres no mundo do trabalho. Nesta atividade, vamos discutir a importância da igualdade de gênero no mercado de trabalho, destacando as vantagens da diversidade e da inclusão para as empresas e a sociedade como um todo.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 11500,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'Os desafios da inclusão digital',
        description:
          'A inclusão digital é essencial na era da informação, garantindo que todos tenham acesso aos recursos e oportunidades oferecidos pela tecnologia. No entanto, a exclusão digital ainda é uma realidade para muitas pessoas, especialmente aquelas em situação de vulnerabilidade social. Nesta atividade, vamos explorar os desafios da inclusão digital, discutindo maneiras de superar as barreiras de acesso à tecnologia e promover a inclusão digital para todos.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 11600,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'O papel da juventude na construção de um mundo melhor',
        description:
          'Os jovens têm um papel fundamental na construção de um mundo mais justo, sustentável e inclusivo. Sua energia, criatividade e vontade de mudança podem impulsionar transformações significativas em suas comunidades e além. Nesta atividade, vamos explorar o papel da juventude na construção de um mundo melhor, incentivando o engajamento cívico, a participação política e o ativismo em prol de causas sociais e ambientais.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 11700,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'A importância do voluntariado para a sociedade',
        description:
          'O voluntariado desempenha um papel crucial no fortalecimento das comunidades e na promoção do bem-estar social. Ao dedicar seu tempo e habilidades para ajudar os outros, os voluntários não apenas fazem uma diferença tangível nas vidas das pessoas, mas também experimentam um senso de realização pessoal e conexão com sua comunidade. Nesta atividade, vamos discutir a importância do voluntariado para a sociedade, destacando suas vantagens tanto para os voluntários quanto para aqueles que recebem sua ajuda.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 11800,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },
      {
        name: 'Os desafios da saúde mental na sociedade contemporânea',
        description:
          'A saúde mental é um aspecto fundamental do bem-estar humano, mas ainda enfrenta estigma e falta de recursos em muitas partes do mundo. O estresse, a ansiedade e a depressão são apenas algumas das questões que afetam milhões de pessoas em todo o globo. Nesta atividade, vamos discutir os desafios da saúde mental na sociedade contemporânea, promovendo a conscientização e discutindo estratégias de prevenção e tratamento.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 11900,
        promptId: promptId,
        classroomId: classrooms[3].id,
      },

      {
        name: 'Os desafios da saúde mental na sociedade contemporânea',
        description:
          'A saúde mental é um aspecto fundamental do bem-estar humano, mas ainda enfrenta estigma e falta de recursos em muitas partes do mundo. O estresse, a ansiedade e a depressão são apenas algumas das questões que afetam milhões de pessoas em todo o globo. Nesta atividade, vamos discutir os desafios da saúde mental na sociedade contemporânea, promovendo a conscientização e discutindo estratégias de prevenção e tratamento.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 12000,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'O impacto da globalização na cultura local',
        description:
          'A globalização trouxe consigo inúmeras mudanças, incluindo o acesso facilitado a diferentes culturas e formas de expressão. No entanto, esse fenômeno também levanta questões sobre a preservação da identidade cultural local. Nesta atividade, vamos explorar o impacto da globalização na cultura local, discutindo os desafios e oportunidades que surgem dessa interação entre o global e o local.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 12100,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'A importância da empatia nas relações humanas',
        description:
          'A empatia é a capacidade de se colocar no lugar do outro, compreendendo seus sentimentos e perspectivas. Essa habilidade é fundamental para construir relações saudáveis e resolver conflitos de forma pacífica. Nesta atividade, vamos explorar a importância da empatia nas relações humanas, destacando sua contribuição para a construção de uma sociedade mais solidária e inclusiva.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 12200,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os impactos da inteligência artificial no mercado de trabalho',
        description:
          'A inteligência artificial está transformando rapidamente o mercado de trabalho, automatizando tarefas e criando novas oportunidades, mas também levantando preocupações sobre o futuro do emprego humano. Nesta atividade, vamos discutir os impactos da inteligência artificial no mercado de trabalho, explorando as oportunidades e os desafios que essa tecnologia traz para os trabalhadores e para a sociedade como um todo.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 12300,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'O papel da educação na promoção da igualdade de gênero',
        description:
          'A educação desempenha um papel fundamental na promoção da igualdade de gênero, fornecendo às meninas e mulheres as ferramentas necessárias para alcançar seu pleno potencial e desafiar estereótipos de gênero. Nesta atividade, vamos explorar o papel da educação na promoção da igualdade de gênero, discutindo estratégias para superar as barreiras que ainda existem no acesso à educação e na igualdade de oportunidades.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 12400,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os desafios da gestão de resíduos sólidos nas cidades',
        description:
          'O aumento da população urbana tem gerado uma quantidade cada vez maior de resíduos sólidos, representando um desafio para a gestão ambiental e a saúde pública. Nesta atividade, vamos discutir os desafios da gestão de resíduos sólidos nas cidades, explorando alternativas sustentáveis de coleta, reciclagem e disposição final dos resíduos.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 12500,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'A importância da diversidade cultural na construção de sociedades inclusivas',
        description:
          'A diversidade cultural é uma riqueza que enriquece a vida em sociedade, promovendo o diálogo intercultural e o respeito às diferenças. Nesta atividade, vamos explorar a importância da diversidade cultural na construção de sociedades inclusivas, discutindo formas de valorizar e preservar as diferentes expressões culturais e promover o entendimento entre os povos.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 12600,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os desafios da segurança cibernética na era digital',
        description:
          'Com o aumento da dependência da tecnologia digital, a segurança cibernética tornou-se uma preocupação crescente, com hackers e cibercriminosos buscando explorar vulnerabilidades para roubar dados e causar danos. Nesta atividade, vamos discutir os desafios da segurança cibernética na era digital, explorando medidas de proteção e conscientização para mitigar os riscos de ataques cibernéticos.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 12700,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'O papel da juventude na construção de um futuro sustentável',
        description:
          'Os jovens desempenham um papel crucial na construção de um futuro sustentável, trazendo energia, criatividade e novas perspectivas para os desafios ambientais, sociais e econômicos. Nesta atividade, vamos explorar o papel da juventude na promoção da sustentabilidade, incentivando o engajamento cívico e a participação ativa na busca por soluções para os problemas globais.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 12800,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os desafios da inclusão de pessoas com deficiência no mercado de trabalho',
        description:
          'Apesar dos avanços na legislação e nas políticas de inclusão, as pessoas com deficiência ainda enfrentam barreiras significativas no acesso ao mercado de trabalho, incluindo preconceito, falta de acessibilidade e discriminação. Nesta atividade, vamos discutir os desafios da inclusão de pessoas com deficiência no mercado de trabalho, explorando estratégias para promover a igualdade de oportunidades e a diversidade nas empresas.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 12900,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'A importância da educação ambiental nas escolas',
        description:
          'A educação ambiental desempenha um papel fundamental na formação de cidadãos conscientes e responsáveis, capazes de compreender os desafios ambientais e tomar medidas para proteger o meio ambiente. Nesta atividade, vamos explorar a importância da educação ambiental nas escolas, discutindo maneiras de integrar conceitos e práticas sustentáveis ​​no currículo educacional e na vida cotidiana dos alunos.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 13000,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os desafios da segurança alimentar em áreas de vulnerabilidade',
        description:
          'Em muitas regiões do mundo, a segurança alimentar é uma preocupação constante, especialmente em áreas de vulnerabilidade socioeconômica. A falta de acesso a alimentos nutritivos e seguros pode levar a uma série de problemas de saúde e sociais. Nesta atividade, vamos discutir os desafios da segurança alimentar em áreas de vulnerabilidade, explorando estratégias para garantir o acesso equitativo a uma alimentação adequada e saudável.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 13100,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'A importância da alfabetização financeira para jovens',
        description:
          'A alfabetização financeira é uma habilidade essencial para navegar no mundo moderno, permitindo que os jovens tomem decisões informadas sobre questões financeiras e assumam o controle de suas finanças pessoais. Nesta atividade, vamos explorar a importância da alfabetização financeira para jovens, discutindo conceitos básicos de finanças e estratégias para promover uma gestão financeira responsável.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 13200,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os desafios da mobilidade urbana em cidades superpovoadas',
        description:
          'Em muitas cidades superpovoadas, a mobilidade urbana tornou-se um desafio significativo, com congestionamentos de trânsito, poluição do ar e falta de infraestrutura adequada para pedestres e ciclistas. Nesta atividade, vamos discutir os desafios da mobilidade urbana em cidades superpovoadas, explorando soluções para promover o transporte público sustentável e melhorar a qualidade de vida dos habitantes.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 13300,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'A importância da preservação da biodiversidade',
        description:
          'A biodiversidade é a base da vida na Terra, fornecendo os recursos naturais essenciais para a sobrevivência humana, desde alimentos até medicamentos. No entanto, a perda de biodiversidade devido à atividade humana representa uma ameaça séria para o equilíbrio dos ecossistemas. Nesta atividade, vamos explorar a importância da preservação da biodiversidade, discutindo maneiras de proteger e conservar a variedade de formas de vida em nosso planeta.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 13400,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os impactos da urbanização descontrolada no meio ambiente',
        description:
          'A urbanização descontrolada tem causado uma série de impactos negativos no meio ambiente, incluindo a perda de habitats naturais, poluição do ar e da água, e aumento do risco de desastres naturais. Nesta atividade, vamos discutir os impactos da urbanização descontrolada no meio ambiente, explorando estratégias para promover o desenvolvimento urbano sustentável e proteger os ecossistemas naturais.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 13500,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'O papel da arte na promoção da conscientização social',
        description:
          'A arte tem o poder único de provocar emoções e despertar consciências, tornando-se uma ferramenta poderosa para promover a conscientização social e inspirar mudanças positivas na sociedade. Nesta atividade, vamos explorar o papel da arte na promoção da conscientização social, analisando exemplos de obras de arte que abordam questões importantes e desafiam as normas sociais.',
        createdAt: new Date(),
        dueDate: day_4,
        maxSize: 13600,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os desafios da educação a distância na era digital',
        description:
          'Com o avanço da tecnologia digital, a educação a distância tornou-se uma opção cada vez mais popular para pessoas de todas as idades que desejam adquirir novos conhecimentos e habilidades. No entanto, essa modalidade de ensino também enfrenta desafios únicos, como a necessidade de acesso confiável à internet e a falta de interação face a face. Nesta atividade, vamos discutir os desafios da educação a distância na era digital, explorando maneiras de superar essas barreiras e aproveitar ao máximo as oportunidades oferecidas pela tecnologia.',
        createdAt: new Date(),
        dueDate: day_1,
        maxSize: 13700,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'A importância da conservação dos recursos hídricos',
        description:
          'A água é um recurso vital para a vida em nosso planeta, mas sua disponibilidade e qualidade estão cada vez mais ameaçadas devido à exploração descontrolada e à poluição. Nesta atividade, vamos explorar a importância da conservação dos recursos hídricos, discutindo maneiras de proteger e preservar as fontes de água doce para as gerações futuras.',
        createdAt: new Date(),
        dueDate: day_2,
        maxSize: 13800,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
      {
        name: 'Os desafios da inclusão digital em comunidades carentes',
        description:
          'A inclusão digital é essencial para garantir que todas as pessoas tenham acesso às oportunidades oferecidas pela tecnologia digital, mas muitas comunidades carentes ainda enfrentam desafios significativos nesse sentido. Nesta atividade, vamos discutir os desafios da inclusão digital em comunidades carentes, explorando estratégias para reduzir a exclusão digital e promover o acesso equitativo à internet e às tecnologias digitais.',
        createdAt: new Date(),
        dueDate: day_3,
        maxSize: 13900,
        promptId: promptId,
        classroomId: classrooms[4].id,
      },
    ]

    if ((await db.activity.count()) === 0) {
      await db.activity.createMany({ data: activityData })
      console.log('Activities added')
    } else {
      console.log('Activities already seeded')
    }

    const activityId = (await db.activity.findMany())[0].id

    const documentData = [
      {
        content: `A leitura é uma ferramenta fundamental na formação do cidadão, desempenhando um papel crucial no desenvolvimento intelectual, social e cultural de indivíduos e comunidades. Através da leitura, é possível expandir os horizontes, adquirir conhecimento e desenvolver habilidades essenciais para uma participação ativa na sociedade.
      Primeiramente, é importante ressaltar que a leitura estimula o pensamento crítico e a capacidade de análise. Ao se deparar com diferentes ideias, perspectivas e argumentos presentes nos livros, o leitor é desafiado a refletir sobre questões complexas e a formar suas próprias opiniões de forma fundamentada. Dessa forma, a leitura contribui para o desenvolvimento de cidadãos mais conscientes e capazes de participar de debates e tomadas de decisão de forma responsável.
      Além disso, a leitura é essencial para o desenvolvimento da empatia e da compreensão do outro. Ao mergulhar nas histórias de personagens diversos, o leitor tem a oportunidade de vivenciar diferentes realidades, experiências e emoções, ampliando sua capacidade de se colocar no lugar do próximo e de valorizar a diversidade humana. Essa empatia cultivada pela leitura é fundamental para a construção de uma sociedade mais inclusiva e solidária.
      Por fim, a leitura também desempenha um papel importante na formação da identidade cultural e na preservação da memória coletiva. Ao explorar obras literárias que retratam diferentes períodos históricos, culturas e tradições, o leitor enriquece sua compreensão do mundo e fortalece sua conexão com suas raízes e com a história de seu país.
      Diante disso, fica evidente que a leitura não é apenas uma atividade prazerosa, mas sim uma ferramenta poderosa para a formação do cidadão. Investir na promoção da leitura desde a infância é fundamental para garantir que todos os indivíduos tenham acesso aos benefícios que essa prática pode proporcionar, contribuindo assim para a construção de uma sociedade mais informada, crítica e humanitária.`,
        handed: new Date(),
        activityId: activityId,
        studentId: users[10].id,
      },
      {
        content: `A leitura é um dos pilares essenciais na formação do cidadão em uma sociedade que busca o desenvolvimento intelectual e social de seus indivíduos. Através da prática da leitura, não apenas se adquire conhecimento, mas se desenvolvem habilidades cognitivas, emocionais e interpessoais fundamentais para uma participação ativa e consciente na sociedade.
      Em primeiro lugar, é importante destacar que a leitura é uma fonte inesgotável de conhecimento. Por meio dela, tem-se acesso a diferentes informações, ideias, culturas e formas de pensamento, ampliando assim o repertório do leitor e sua compreensão do mundo. Essa diversidade de conteúdos contribui para uma formação mais abrangente e crítica, permitindo que o cidadão desenvolva uma visão mais ampla e complexa das questões que permeiam a sociedade.
      Além disso, a leitura também é fundamental para o desenvolvimento da linguagem e da capacidade de expressão. Ao entrar em contato com textos variados, o leitor amplia seu vocabulário, aprimora sua gramática e desenvolve sua habilidade de comunicação escrita e oral. Essas competências são essenciais não apenas para o sucesso acadêmico e profissional, mas também para uma participação efetiva no debate público e na vida democrática.
      Outro aspecto relevante é o papel da leitura na formação do senso crítico e na promoção do pensamento reflexivo. Ao analisar e interpretar textos, o leitor é constantemente desafiado a questionar, problematizar e buscar novos entendimentos, exercitando assim sua capacidade de pensar de forma autônoma e argumentativa. Esse pensamento crítico é fundamental para uma atuação consciente e responsável na sociedade, contribuindo para o desenvolvimento de cidadãos capazes de fazer escolhas informadas e de defender seus direitos e valores.
      Diante do exposto, é inegável a importância da leitura na formação do cidadão. Investir na promoção da leitura, desde os primeiros anos de vida, é essencial para garantir que todos os indivíduos tenham acesso às oportunidades e benefícios que essa prática proporciona, contribuindo assim para o fortalecimento da educação, da cultura e da cidadania em nossa sociedade.`,
        handed: new Date(),
        activityId: activityId,
        studentId: users[11].id,
      },
    ]

    if ((await db.document.count()) === 0) {
      await db.document.createMany({ data: documentData })
      console.log('Documents added')
    } else {
      console.log('Documents already seeded')
    }

    const documents = await db.document.findMany()
    const subfactors = await db.subfactor.findMany()

    const correctionData = [
      {
        text: 'é importante ressaltar que a leitura estimula',
        correct: 'é importante ressaltar que a leitura estimula!',
        severity: 'B',
        description: `Há muitos argumentos aqui.`,
        professorId: users[2].id,
        subfactorId: subfactors[3].id,
        documentId: documents[0].id,
      },
      {
        text: 'desenvolvimento da empatia e da compreensão',
        correct: null,
        severity: 'N',
        description: `Existem erros de acentuação, aqui. `,
        professorId: users[2].id,
        subfactorId: subfactors[23].id,
        documentId: documents[0].id,
      },
      {
        text: 'desempenhando um papel crucial no desenvolvimento intelectual',
        correct: 'desenvolvimento crucial',
        severity: 'B',
        description: `Acentuação utilizada de forma incorreta.`,
        professorId: users[2].id,
        subfactorId: subfactors[22].id,
        documentId: documents[0].id,
      },
      {
        text: 'Ao mergulhar nas histórias de personagens diversos',
        correct: null,
        severity: 'G',
        description: `Uso de aspas utilizadas de forma desnecessária.`,
        professorId: users[2].id,
        subfactorId: subfactors[29].id,
        documentId: documents[0].id,
      },
      {
        text: 'habilidades essenciais para uma participação ativa na sociedade',
        correct: 'essenciais para uma participação',
        severity: 'N',
        description: `Cuidado, existe erro recorrente ao ponto citado.`,
        professorId: users[2].id,
        subfactorId: subfactors[42].id,
        documentId: documents[0].id,
      },
      {
        text: 'raízes e com a história de seu país',
        correct: null,
        severity: 'G',
        description: `Atenção! Isso é muito comum, pesquise o tema.`,
        professorId: users[2].id,
        subfactorId: subfactors[12].id,
        documentId: documents[0].id,
      },

      {
        text: 'Por meio dela, tem-se',
        correct: 'Por meio dela, se tem',
        severity: 'B',
        description: `Procure melhorar o ponto comentado.`,
        professorId: users[3].id,
        subfactorId: subfactors[54].id,
        documentId: documents[1].id,
      },
      {
        text: 'promoção do pensamento reflexivo',
        correct: 'promove o pensamento',
        severity: 'B',
        description: `Isto não deveria estar aqui.`,
        professorId: users[3].id,
        subfactorId: subfactors[23].id,
        documentId: documents[1].id,
      },
      {
        text: 'leitura também é fundamental para o desenvolvimento da linguagem e da capacidade de expressão',
        correct: null,
        severity: 'G',
        description: `Olhe a descrição.`,
        professorId: users[3].id,
        subfactorId: subfactors[18].id,
        documentId: documents[1].id,
      },
      {
        text: 'contribuindo assim para o fortalecimento da educação',
        correct: null,
        severity: 'N',
        description: `Atenção! Isso é muito comum, pesquise o tema.`,
        professorId: users[3].id,
        subfactorId: subfactors[34].id,
        documentId: documents[1].id,
      },
      {
        text: 'Investir na promoção da leitura',
        correct: null,
        severity: 'N',
        description: `É preciso tomar cuidado no ponto citado. `,
        professorId: users[3].id,
        subfactorId: subfactors[22].id,
        documentId: documents[1].id,
      },
    ]

    if ((await db.correction.count()) === 0) {
      await db.correction.createMany({ data: correctionData })
      console.log('Corrections added')
    } else {
      console.log('Corrections already seeded')
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

import { useState, useEffect } from 'react'

import { OpenAI } from 'openai'

import { useAuth } from 'src/auth'

import DocumentComments from '../DocumentComments/DocumentComments'
import DocumentMark from '../DocumentMark/DocumentMark'
import DocumentText from '../DocumentText/DocumentText'

const history = [
  {
    role: 'system',
    content: `Você é um especialista em análise de textos e redações para o ENEM.`,
  },
  {
    role: 'user',
    content: `Forneça uma análise detalhada da redação abaixo em formato JSON, incluindo correções gramaticais, semânticas e pontuais, além de uma avaliação das competências do ENEM (argumentação, coerência, compreensão do tema, domínio da escrita formal e recursos coesivos). Utilize uma escala de notas de 0 a 200 para cada competência, com incrementos de 20 com nota final entre 0 e 1000. Justifique cada correção e avaliação. O tema da redação é "A importância da leitura na formação do cidadão".

Redação:

A leitura desempenha um papel crucial na formaçao do cidadão, sendo fundamental para o desenvolvimento intelectual e social. Em um mundo onde a informaçao é constantemente consumida, a capacidade de interpretar e analisar criticamente os textos é essencial. Assim, a leitura se configura como uma ferramenta indispensável para a formaçao de indivíduos mais preparados e engajados na sociedade.

Primeiramente, a leitura é vital para o aprimoramento do pensamento crítico e da capacidade de argumentaçao. Ao explorar diferentes gêneros literários e autores, o leitor é exposto a diversas perspectivas e contextos, o que enriquece seu entendimento sobre o mundo. Esse processo nao apenas melhora a habilidade de escrever e comunicar, mais também fomenta uma análise mais profunda das questoes sociais e políticas.

Além disso, a leitura desempenha um papel significativo na formaçao da cidadania. Por meio de livros que abordam temas como direitos humanos, justiça e história, o cidadão se torna mais consciente das dinâmicas sociais e dos problemas enfrentados pela sociedade. Isso promove um maior engajamento cívico e uma atitude mais responsável em relaçao às questoes coletivas.

No entanto, o acesso limitado a livros e a predominância das mídias digitais são desafios que dificultam a pratica da leitura. Para superar essas barreiras, é crucial promover politicas públicas que incentivem o hábito da leitura desde a infância, além de utilizar a tecnologia para facilitar o acesso a livros digitais e audiobooks. Somente com essas medidas será possível garantir que mais pessoas se beneficiem dos impactos positivos da leitura.`,
  },
  {
    role: 'system',
    content: `{
  "corrections": [
    {
      "text": "A leitura desempenha um papel crucial na formaçao do cidadão",
      "id": 1,
      "severity": "B",
      "description": "Correção ortográfica: 'formaçao' deveria ser 'formação'.",
      "correct": "A leitura desempenha um papel crucial na formação do cidadão"
    },
    {
      "text": "pensamento crítico e da capacidade de argumentaçao",
      "id": 2,
      "severity": "B",
      "description": "Correção ortográfica: 'argumentaçao' deveria ser 'argumentação'.",
      "correct": "pensamento crítico e da capacidade de argumentação"
    },
    {
      "text": "mais também fomenta",
      "id": 3,
      "severity": "B",
      "description": "Correção gramatical: 'mais' deveria ser 'mas'.",
      "correct": "mas também fomenta"
    },
    {
      "text": "pratica da leitura",
      "id": 4,
      "severity": "B",
      "description": "Correção ortográfica: 'pratica' deveria ser 'prática'.",
      "correct": "prática da leitura"
    },
    {
      "text": "politicas públicas",
      "id": 5,
      "severity": "B",
      "description": "Correção ortográfica: 'politicas' deveria ser 'políticas'.",
      "correct": "políticas públicas"
    },
    {
      "text": "capacidade de interpretar e analisar criticamente os textos",
      "id": 6,
      "severity": "G",
      "description": "Boa utilização de expressão ao destacar a importância da leitura."
    },
    {
      "text": "promove um maior engajamento cívico e uma atitude mais responsável",
      "id": 7,
      "severity": "G",
      "description": "Boa argumentação sobre os efeitos positivos da leitura na cidadania."
    },
    {
      "text": "A leitura se configura como uma ferramenta indispensável para a formaçao de indivíduos",
      "id": 8,
      "severity": "N",
      "description": "Expressão adequada, mas poderia ser mais concisa."
    }
  ],
  "mark": 800,
  "subfactors_marks": {
    "1. Domínio da modalidade de escrita formal": A redação apresenta um bom domínio da norma culta da língua portuguesa, embora com alguns erros gramaticais e ortográficos. A escrita é clara e compreensível, mas a presença de erros compromete a fluência do texto.,
    "2. Compreensão do tema": O tema é muito bem compreendido e desenvolvido, com uma reflexão clara sobre a importância da educação inclusiva e as dificuldades para implementá-la nas escolas brasileiras. A redação aborda as limitações dos recursos, a falta de treinamento de professores, a resistência ao preconceito e o descaso das autoridades.,
    "3. Argumentação e coerência": A argumentação é razoável, mas poderia ser mais aprofundada, especialmente em relação às soluções propostas. O desenvolvimento do tema é linear, mas faltam mais exemplos práticos ou dados concretos que reforcem os argumentos apresentados.,
    "4. Atendimento ao gênero/Tipo": A redação segue o gênero dissertativo-argumentativo de forma adequada, mas há momentos em que a estrutura do texto poderia ser mais organizada, com transições mais suaves entre os parágrafos. Apesar disso, a organização geral está boa.,
    "5. Recursos coesivos": A utilização de recursos coesivos é razoável. Algumas frases estão bem conectadas, mas há momentos em que a coesão entre as ideias não é perfeita, prejudicando a fluidez do texto. O uso de conectivos pode ser melhorado.
  },
  "comments": [
    {
      "id": 1,
      "content": "A redação aborda de maneira relevante e clara o tema da educação inclusiva, destacando as principais dificuldades enfrentadas pelas escolas brasileiras para garantir uma educação de qualidade para todos os alunos, independentemente de suas deficiências. A argumentação é válida, ressaltando questões como a falta de recursos, o preconceito e a ausência de formação adequada dos professores. No entanto, a redação apresenta alguns erros ortográficos e gramaticais que comprometem a fluidez do texto e a formalidade exigida para o gênero dissertativo-argumentativo. Além disso, a argumentação poderia ser mais aprofundada, especialmente ao discutir soluções práticas para os problemas apontados. A utilização de exemplos concretos ou dados estatísticos ajudaria a fortalecer os argumentos e a tornar o texto mais persuasivo. Apesar das falhas, a redação demonstra boa compreensão do tema e oferece uma reflexão importante sobre a importância da inclusão na educação brasileira.",
      "user": {
        "name": "GPT"
      }
    }
  ]
}`,
  },
]

const textPrompt = (text, theme) => `
Forneça uma análise detalhada da redação abaixo em formato JSON, incluindo correções gramaticais, semânticas e pontuais, além de uma avaliação das competências do ENEM (argumentação, coerência, compreensão do tema, domínio da escrita formal e recursos coesivos). Utilize uma escala de notas de 0 a 200 para cada competência, com incrementos de 20 com nota final entre 0 e 1000. Justifique cada correção e avaliação. O tema da redação é "${theme}".
Redação: ${text.replace('\n', ' ')}
`

export async function gptRun(
  text,
  theme,
  setLoading,
  setResponse,
  currentUser
) {
  setLoading(true)
  try {
    const openai = new OpenAI({
      apiKey: currentUser.gptKey,
      dangerouslyAllowBrowser: true,
    })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        ...history,
        {
          role: 'user',
          content: textPrompt(text, theme),
        },
      ],
      temperature: 0.7,
    })

    let responseText = response?.choices?.[0]?.message?.content
    responseText = responseText.replace('json', '').replace('```', '')
    console.log(response)
    console.log(responseText)

    if (responseText && responseText.trim().startsWith('{')) {
      const responseJson = JSON.parse(responseText)
      setResponse(responseJson)
    } else {
      console.error('Resposta não é um JSON válido:', responseText)
    }
  } catch (error) {
    console.error('Erro ao processar a resposta:', error)
  } finally {
    setLoading(false)
  }
}

const GPTCorrection = ({ text, theme, image }) => {
  const { currentUser } = useAuth()

  const [gptResponse, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    gptRun(text, theme, setLoading, setResponse, currentUser)
  }, [text, currentUser, theme])

  return (
    <div>
      {loading
        ? 'Carregando...'
        : gptResponse && (
            <>
              <DocumentText
                title={theme}
                content={text}
                corrections={gptResponse.corrections}
              />
              <DocumentMark
                mark={gptResponse.mark}
                subFactorsMark={gptResponse.subfactors_marks}
              />
              <DocumentComments comments={gptResponse.comments} />
            </>
          )}
    </div>
  )
}

export default GPTCorrection

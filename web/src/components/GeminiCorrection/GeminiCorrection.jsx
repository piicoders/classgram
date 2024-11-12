import { useState, useEffect } from 'react'

import { GoogleGenerativeAI } from '@google/generative-ai'

import { useAuth } from 'src/auth'

import DocumentComments from '../DocumentComments/DocumentComments'
import DocumentMark from '../DocumentMark/DocumentMark'
import DocumentText from '../DocumentText/DocumentText'

const history = {
  history: [
    {
      role: 'user',
      parts: [
        {
          text: `corrija esse prompt para a solicitação acima:
Forneça uma análise detalhada da redação abaixo em formato JSON, incluindo correções gramaticais, semânticas e pontuais, além de uma avaliação das competências do ENEM (argumentação, coerência, compreensão do tema, domínio da escrita formal e recursos coesivos). Utilize uma escala de notas de 0 a 200 para cada competência, com incrementos de 20 com nota final entre 0 e 1000. Justifique cada correção e avaliação. O tema da redação é "A importância da leitura na formação do cidadão".

Redação:

A leitura desempenha um papel crucial na formaçao do cidadão, sendo fundamental para o desenvolvimento intelectual e social. Em um mundo onde a informaçao é constantemente consumida, a capacidade de interpretar e analisar criticamente os textos é essencial. Assim, a leitura se configura como uma ferramenta indispensável para a formaçao de indivíduos mais preparados e engajados na sociedade.

Primeiramente, a leitura é vital para o aprimoramento do pensamento crítico e da capacidade de argumentaçao. Ao explorar diferentes gêneros literários e autores, o leitor é exposto a diversas perspectivas e contextos, o que enriquece seu entendimento sobre o mundo. Esse processo nao apenas melhora a habilidade de escrever e comunicar, mais também fomenta uma análise mais profunda das questoes sociais e políticas.

Além disso, a leitura desempenha um papel significativo na formaçao da cidadania. Por meio de livros que abordam temas como direitos humanos, justiça e história, o cidadão se torna mais consciente das dinâmicas sociais e dos problemas enfrentados pela sociedade. Isso promove um maior engajamento cívico e uma atitude mais responsável em relaçao às questoes coletivas.

No entanto, o acesso limitado a livros e a predominância das mídias digitais são desafios que dificultam a pratica da leitura. Para superar essas barreiras, é crucial promover politicas públicas que incentivem o hábito da leitura desde a infância, além de utilizar a tecnologia para facilitar o acesso a livros digitais e audiobooks. Somente com essas medidas será possível garantir que mais pessoas se beneficiem dos impactos positivos da leitura.`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `{
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
    "1. Domínio da modalidade de escrita formal": 140,
    "2. Compreensão do tema": 200,
    "3. Argumentação e coerência": 160,
    "4. Atendimento ao gênero/Tipo": 180,
    "5. Recursos coesivos": 120
  },
  "comments": [
    {
      "id": 1,
      "content": "A redação aborda de forma adequada o tema 'A importância da leitura na formação do cidadão'. A argumentação é clara e coerente, e a compreensão do tema é excelente. No entanto, há alguns erros ortográficos e gramaticais que precisam ser corrigidos. O domínio da escrita formal é bom, mas pode ser melhorado. A utilização de recursos coesivos também pode ser mais sofisticada.",
      "user": {
        "name": "Gemini"
      }
    }
  ]
}`,
        },
      ],
    },
  ],
}

const textPrompt = (text, theme) => `
    Forneça uma análise detalhada da redação abaixo em formato JSON, incluindo correções gramaticais, semânticas e pontuais, além de uma avaliação das competências do ENEM (argumentação, coerência, compreensão do tema, domínio da escrita formal e recursos coesivos). Utilize uma escala de notas de 0 a 200 para cada competência, com incrementos de 20 com nota final entre 0 e 1000. Justifique cada correção e avaliação. O tema da redação é "${theme}".
    Redação: ${text.replace('\n', ' ')}
  `

export async function geminiRun(
  text,
  theme,
  setLoading,
  setResponse,
  currentUser
) {
  setLoading(true)
  try {
    const genAI = new GoogleGenerativeAI(currentUser.geminiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const chat = model.startChat(history)
    const result = await chat.sendMessage(textPrompt(text, theme))
    const responseText = await result.response.text().replace('json', '').replace('```', '')
    console.log('Resposta bruta:', responseText)

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

const GeminiCorrection = ({ text, theme, image }) => {
  const { currentUser } = useAuth()

  const [geminiResponse, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    geminiRun(text, theme, setLoading, setResponse, currentUser)
  }, [text, currentUser, theme])

  return (
    <div>
      {loading
        ? 'Carregando...'
        : geminiResponse && (
            <>
              <DocumentText
                title={theme}
                content={text}
                corrections={geminiResponse.corrections}
              />
              <DocumentMark
                mark={geminiResponse.mark}
                subFactorsMark={geminiResponse.subfactors_marks}
              />
              <DocumentComments comments={geminiResponse.comments} />
            </>
          )}
    </div>
  )
}

export default GeminiCorrection

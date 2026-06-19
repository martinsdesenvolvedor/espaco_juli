import { Treatment } from "../types";

export const TREATMENTS_DATA: Treatment[] = [
  {
    id: "podologia-geral",
    title: "Podologia Geral & Preventiva",
    shortDescription: "Cuidado completo e preventivo para a saúde e estética dos seus pés, incluindo corte técnico, remoção de calosidades e hidratação profunda.",
    fullDescription: "O tratamento tradicional de Podologia Geral é a base para manter seus pés saudáveis, livres de dores e esteticamente impecáveis. É indicado tanto para prevenção de patologias quanto para manutenção do bem-estar. Consiste em uma avaliação clínica detalhada, corte técnico e correto das unhas (para evitar que encravem), desbaste de calos e calosidades, lixamento e assepsia profunda, finalizando com uma massagem relaxante com creme hidratante específico para a derme plantar.",
    benefits: [
      "Prevenção do surgimento de unhas encravadas e fissuras",
      "Remoção indolor de calos crônicos e pele morta",
      "Alívio imediato no atrito com calçados",
      "Estímulo à renovação celular e hidratação da derme plantar",
      "Avaliação profissional e diagnóstico precoce de micoses ou infecções"
    ],
    indications: [
      "Pessoas de todas as idades que buscam manter a higiene e a beleza dos pés",
      "Profissionais que passam longos períodos em pé ou com calçados fechados",
      "Praticantes de atividades físicas regulares"
    ],
    iconName: "Footprints",
    duration: "50-60 min",
    price: "R$ 130"
  },
  {
    id: "unha-encravada",
    title: "Tratamento de Unha Encravada (Onicocriptose)",
    shortDescription: "Alívio imediato da dor, tratamento de infecções e aplicação de órteses corretivas (FPM) para direcionar o crescimento correto da unha.",
    fullDescription: "A unha encravada ocorre quando a borda lateral da unha penetra no tecido macio ao seu redor, causando dor intensa, inflamação e, por vezes, infecção (granuloma). Nosso tratamento foca no alívio imediato do desconforto de maneira ética e o mais indolor possível. Além da retirada precisa da espícula (pedaço de unha encravada), realizamos a higienização com alta frequência ou curativo adequado. Para os casos recorrentes, aplicamos órteses corretivas de fibra de vidro ou metálicas, que atuam como uma alavanca para erguer as bordas da unha, reeducando seu crescimento.",
    benefits: [
      "Alívio imediato da dor e da pressão plantar",
      "Procedimento seguro realizado com instrumentos rigorosamente esterilizados",
      "Reeducação ungueal por meio de órteses (evita cirurgias invasivas)",
      "Acompanhamento clínico até a regeneração completa da pele",
      "Orientações personalizadas de corte de unhas e uso de calçados"
    ],
    indications: [
      "Acometidos por dor, vermelhidão ou inchaço ao redor das unhas do dedão",
      "Pacientes com histórico recorrente de unhas encravadas",
      "Pessoas que realizam corte de unhas de forma inadequada"
    ],
    iconName: "FlameKindling", // Representing specialized thermal/relief care or we can use ShieldAlert
    duration: "40-50 min",
    price: "R$ 150"
  },
  {
    id: "reflexologia",
    title: "Reflexologia Podal Clínica",
    shortDescription: "Massagem terapêutica em pontos reflexos dos pés que promove relaxamento profundo, alívio do estresse e equilíbrio físico e mental.",
    fullDescription: "A Reflexologia Podal é uma terapia complementar integrativa de altíssima eficácia. Fundamenta-se no princípio de que existem terminações nervosas e pontos reflexos nos pés correspondentes a cada órgão, glândula e sistema do corpo humano. Através de pressões manuais precisas, estimula-se a autocura e o relaxamento. Esta massagem terapêutica ajuda na redução do cortisol (hormônio do estresse), melhora as funções circulatórias e linfáticas, e induz um estado de meditação e restauração energética ideal para equilibrar o ritmo moderno de vida.",
    benefits: [
      "Estímulo do fluxo sanguíneo e redução do inchaço nas pernas e pés",
      "Relaxamento profundo e redução drástica dos sintomas de ansiedade e estresse",
      "Melhoria na qualidade do sono e combate à insônia",
      "Liberação de toxinas acumuladas no organismo",
      "Sensação imediata de leveza plantar e tranquilidade mental"
    ],
    indications: [
      "Pessoas estressadas, cansadas ou com alta carga de ansiedade profissional",
      "Pacientes com fadiga muscular crônica, dores nas costas ou dores de cabeça",
      "Interessados em terapias preventivas holísticas e relaxamento profundo"
    ],
    iconName: "Sparkles",
    duration: "45 min",
    price: "R$ 120"
  },
  {
    id: "podogeriatria",
    title: "Podogeriatria (Cuidado para a Terceira Idade)",
    shortDescription: "Atendimento especializado e humanizado para atender às necessidades específicas e delicadas dos pés de idosos, garantindo marcha segura.",
    fullDescription: "Com o envelhecimento, os pés passam por transformações hormonais e anatômicas naturais: a pele torna-se mais fina, seca e frágil, as unhas tendem a engrossar (onicogrifose) e a sensibilidade diminui, o que aumenta o risco de calosidades dolorosas e lesões. O atendimento podogeriátrico é pautado no carinho, na paciência e no cuidado técnico minucioso. Nosso principal objetivo é proporcionar o máximo de conforto, eliminar dores que dificultam a caminhada, tratar calos de fricção e engrossamento das unhas de maneira segura, estimulando a mobilidade ativa e a independência do idoso.",
    benefits: [
      "Corte seguro e indolor de unhas espessas e endurecidas",
      "Diminuição drástica de calosidades causadas por alterações na pisada",
      "Hidratação intensa e prevenção de rachaduras profundas e dolorosas",
      "Atendimento humanizado focado na anatomia e sensibilidade senil",
      "Prevenção ativa de ferimentos que poderiam virar infecções graves"
    ],
    indications: [
      "Idosos com dificuldade em alcançar ou cortar as próprias unhas",
      "Melhor idade com queixas de dores frequentes ao caminhar",
      "Idosos com unhas grossas, curvadas ou pele extremamente ressecada"
    ],
    iconName: "Heart",
    duration: "50-60 min",
    price: "R$ 140"
  },
  {
    id: "pe-diabetico",
    title: "Tratamento de Pé Diabético",
    shortDescription: "Prevenção especializada com avaliação de sensibilidade dermatológica, corte seguro e hidratação para evitar microlesões e úlceras.",
    fullDescription: "Pessoas com diabetes requerem um olhar clínico extremamente atento. Devido a neuropatias e problemas circulatórios, pequenas lesões que passariam despercebidas nos pés podem evoluir rapidamente para úlceras de difícil cicatrização. A podologia para Pé Diabético é puramente técnica, preventiva e de segurança. Realizamos a avaliação de sensibilidade com monofilamento, examinamos minuciosamente rachaduras, frieiras e atritos, e efetuamos o corte correto sem instrumentos perfurocortantes que possam ferir. O objetivo aqui é manter a barreira cutânea íntegra e saudável, prevenindo complicações graves.",
    benefits: [
      "Avaliação neurossensorial e vascular preventiva periódica",
      "Corte clínico de alta precisão 100% esterilizado e seguro",
      "Uso de hidratantes regeneradores específicos para a pele diabética",
      "Detecção precoce de zonas de hiperpressão e orientação de palmilhas",
      "Paz de espírito com um atendimento profissional focado em risco zero"
    ],
    indications: [
      "Pacientes diagnosticados com Diabetes Tipo 1 ou Tipo 2",
      "Pessoas que apresentam perda de sensibilidade ou formigamento nos pés",
      "Diabéticos com ressecamento extremo e propensão a machucados"
    ],
    iconName: "ShieldCheck",
    duration: "45-50 min",
    price: "R$ 140"
  },
  {
    id: "podopediatria",
    title: "Podopediatria (Podologia Infantil)",
    shortDescription: "Cuidados lúdicos e especializados para crianças e bebês, tratando inflamações ungueais e detectando problemas precoces de pisada.",
    fullDescription: "Muitas crianças sofrem com unhas encravadas e inflamações (onicocriptose infantil), frequentemente desencadeadas pelo uso de meias apertadas, calçados pequenos, ou cortes incorretos em formato arredondado. O atendimento de Podopediatria é realizado em um ambiente lúdico, acolhedor e com termos compreensíveis para desmistificar o medo de consultórios. Além de tratar com extrema suavidade qualquer sintoma inflamatório na unha da criança, fornecemos orientações pedagógicas para que os pais realizem os cortes periódicos corretos em casa, acompanhando o desenvolvimento natural dos pezinhos.",
    benefits: [
      "Tratamento suave e indolor em ambiente acolhedor e sem traumas",
      "Prevenção e cura de inflamações frequentes nas unhas infantis",
      "Instrução direta aos pais sobre técnicas adequadas de higiene e corte",
      "Auxílio na escolha de calçados corretos para cada fase do desenvolvimento",
      "Acompanhamento preventivo da saúde ungueal infantil"
    ],
    indications: [
      "Bebês e crianças com cantos de unha avermelhados, inchados ou doloridos",
      "Crianças com mania de arrancar pedaços da unha com as mãos",
      "Pais buscando orientação profissional sobre os primeiros cortes de unhas"
    ],
    iconName: "Baby",
    duration: "40 min",
    price: "R$ 110"
  }
];

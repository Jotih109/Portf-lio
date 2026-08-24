import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

/**
 * COMPONENTE: InteractivePet (Mascote Interativo que segue o Cursor)
 * 
 * Como funciona a lógica:
 * 1. Pega a posição central do mascote na tela (getBoundingClientRect).
 * 2. Calcula a diferença (deltaX, deltaY) entre o cursor e o centro do mascote.
 * 3. Usa trigonometria (Math.atan2) para encontrar o ângulo exato do olhar.
 * 4. Limita o deslocamento máximo das pupilas para que não saiam do visor.
 * 5. Aplica uma rotação 3D (perspective + rotateX/rotateY) para simular inclinação da cabeça.
 * 6. Detecta inatividade para o mascote "dormir" (zZz) se o mouse parar.
 */
export const InteractivePet: React.FC = () => {
  const petRef = useRef<HTMLDivElement>(null);

  // Estados de rastreamento do olhar e rotação
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Estados emocionais e de interação
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isCurious, setIsCurious] = useState(false); // Quando o mouse chega bem perto
  const [isHappy, setIsHappy] = useState(false); // Quando clicado
  const [dialogText, setDialogText] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const idleTimerRef = useRef<number | null>(null);
  const dialogTimerRef = useRef<number | null>(null);

  const phrases = [
    'Bip bop! Olá! 👋',
    'Seguindo você com precisão! 👀',
    'Estilo Kinect ativado! 🎮',
    'Você tem um ótimo gosto! ✨',
    'Gostou dos projetos? 🚀',
    '*ronronar de robô* 🤖💛',
  ];

  // 1. RASTREAMENTO DO MOUSE E MATEMÁTICA DO OLHAR
  useEffect(() => {
    // Se o usuário não tiver mouse fino (ex: celular puro), desativa o rastreamento pesado
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      // Acorda o pet ao mexer o mouse
      setIsSleeping(false);

      // Reinicia o timer de sono (se ficar 7s sem mover o mouse, dorme)
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        setIsSleeping(true);
      }, 7000);

      if (!petRef.current || isMinimized) return;

      // Descobre onde o pet está na tela agora
      const rect = petRef.current.getBoundingClientRect();
      const petCenterX = rect.left + rect.width / 2;
      const petCenterY = rect.top + rect.height / 2;

      // Distância vetorial entre o mouse e o centro do pet
      const deltaX = e.clientX - petCenterX;
      const deltaY = e.clientY - petCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      // Curiosidade: se o cursor estiver a menos de 130px
      setIsCurious(distance < 130);

      // Ângulo em radianos para onde o olho deve apontar
      const angle = Math.atan2(deltaY, deltaX);

      // Raio máximo que a pupila pode se mover dentro do olho (em pixels)
      const maxPupilRadius = 6.5;
      // Suaviza a distância para não pular bruscamente
      const clampedDistance = Math.min(maxPupilRadius, distance / 22);

      const pupilX = Math.cos(angle) * clampedDistance;
      const pupilY = Math.sin(angle) * clampedDistance;
      setPupilPos({ x: pupilX, y: pupilY });

      // Rotação 3D da cabeça (Parallax suave)
      const maxAngle = 22; // Graus máximos de inclinação
      const normX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth / 1.5)));
      const normY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight / 1.5)));

      setHeadTilt({
        rotateY: normX * maxAngle,
        rotateX: -normY * maxAngle,
      });
    };

    if (isPointerFine) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, [isMinimized]);

  // 2. CICLO NATURAL DE PISCADA
  useEffect(() => {
    const blinkCycle = () => {
      if (!isSleeping) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 160);
      }
    };

    const interval = setInterval(blinkCycle, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [isSleeping]);

  // 3. REAÇÃO AO CLICAR NO PET
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Estado feliz com spin e confete
    setIsHappy(true);
    setIsSleeping(false);

    // Seleciona uma frase aleatória
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setDialogText(randomPhrase);

    if (dialogTimerRef.current) window.clearTimeout(dialogTimerRef.current);
    dialogTimerRef.current = window.setTimeout(() => {
      setDialogText(null);
    }, 2600);

    // Explosão de confetes âmbar / dourado
    try {
      if (petRef.current) {
        const rect = petRef.current.getBoundingClientRect();
        const originX = (rect.left + rect.width / 2) / window.innerWidth;
        const originY = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 28,
          spread: 55,
          origin: { x: originX, y: originY },
          colors: ['#FFB020', '#FF7A18', '#00FFCC', '#FFFFFF'],
          disableForReducedMotion: true,
        });
      }
    } catch {
      // Fallback gracioso caso confetti não suporte
    }

    setTimeout(() => setIsHappy(false), 1000);
  };

  return (
    <div className={`interactive-pet-wrapper ${isMinimized ? 'minimized' : ''}`}>
      {/* Balãozinho de diálogo */}
      {dialogText && !isMinimized && (
        <div className="pet-dialog-bubble" role="status" aria-live="polite">
          <span>{dialogText}</span>
          <div className="pet-dialog-arrow" />
        </div>
      )}

      {/* Símbolo de Zzz quando dormindo */}
      {isSleeping && !isMinimized && (
        <div className="pet-sleep-indicator" aria-hidden="true">
          <span className="z-1">z</span>
          <span className="z-2">Z</span>
          <span className="z-3">Z</span>
        </div>
      )}

      {/* Mascote 3D SVG */}
      <div
        ref={petRef}
        className={`interactive-pet-card ${isHappy ? 'happy-bounce' : ''} ${isCurious ? 'curious' : ''}`}
        onClick={handleClick}
        style={{
          transform: isSleeping
            ? 'perspective(600px) rotateX(10deg) rotateY(0deg)'
            : `perspective(600px) rotateX(${headTilt.rotateX}deg) rotateY(${headTilt.rotateY}deg)`,
        }}
        title="Kinect Pet: Olhando para o seu cursor! Clique em mim."
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e as any)}
      >
        {/* Glow / Sombra embaixo do robô */}
        <div className="pet-shadow-glow" />

        <svg
          viewBox="0 0 100 100"
          className="pet-svg"
          aria-hidden="true"
        >
          <defs>
            {/* Gradiente da Carcaça */}
            <linearGradient id="petBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C1C24" />
              <stop offset="100%" stopColor="#111116" />
            </linearGradient>

            {/* Gradiente do Visor Neon */}
            <linearGradient id="petVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#08080C" />
              <stop offset="100%" stopColor="#0D0D14" />
            </linearGradient>

            {/* Brilho Dourado Neon */}
            <filter id="petGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Antena no topo */}
          <g className="pet-antenna">
            <line x1="50" y1="20" x2="50" y2="9" stroke="#FFB020" strokeWidth="2.5" strokeLinecap="round" />
            <circle
              cx="50"
              cy="8"
              r="4.5"
              fill={isHappy ? '#00FFCC' : isSleeping ? '#555566' : '#FFB020'}
              filter={!isSleeping ? 'url(#petGlow)' : undefined}
            />
          </g>

          {/* Orelhas / Sensores laterais */}
          <rect x="14" y="42" width="5" height="16" rx="2.5" fill="#FFB020" opacity="0.85" />
          <rect x="81" y="42" width="5" height="16" rx="2.5" fill="#FFB020" opacity="0.85" />

          {/* Cabeça / Corpo Principal (Design com bordas arredondadas e aro luminoso) */}
          <rect
            x="18"
            y="20"
            width="64"
            height="60"
            rx="18"
            fill="url(#petBodyGrad)"
            stroke={isCurious ? '#FFB020' : 'rgba(255, 176, 32, 0.4)'}
            strokeWidth="2"
            className="pet-chassis"
          />

          {/* Visor de Vidro Escuro */}
          <rect
            x="24"
            y="28"
            width="52"
            height="44"
            rx="12"
            fill="url(#petVisorGrad)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          {/* OLHOS DO ROBÔ: */}
          {isSleeping ? (
            /* Olhos fechados / dormindo (formato de arcos tranquilos) */
            <g className="pet-eyes-sleeping" stroke="#FFB020" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 34 52 Q 40 57 46 52" />
              <path d="M 54 52 Q 60 57 66 52" />
            </g>
          ) : isBlinking ? (
            /* Olhos piscando (linhas retas rápidas) */
            <g className="pet-eyes-blinking" stroke="#FFB020" strokeWidth="2.5" strokeLinecap="round">
              <line x1="33" y1="50" x2="47" y2="50" />
              <line x1="53" y1="50" x2="67" y2="50" />
            </g>
          ) : (
            /* Olhos abertos que seguem o cursor */
            <g className="pet-eyes-tracking">
              {/* Olho Esquerdo */}
              <g transform={`translate(${40 + pupilPos.x}, ${49 + pupilPos.y})`}>
                <circle
                  cx="0"
                  cy="0"
                  r={isCurious ? 8 : 6.5}
                  fill="#FFB020"
                  filter="url(#petGlow)"
                />
                {/* Reflexo / Brilho do olhar */}
                <circle cx="2" cy="-2" r="2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="-1.5" cy="2" r="0.8" fill="#FFFFFF" opacity="0.5" />
              </g>

              {/* Olho Direito */}
              <g transform={`translate(${60 + pupilPos.x}, ${49 + pupilPos.y})`}>
                <circle
                  cx="0"
                  cy="0"
                  r={isCurious ? 8 : 6.5}
                  fill="#FFB020"
                  filter="url(#petGlow)"
                />
                {/* Reflexo / Brilho do olhar */}
                <circle cx="2" cy="-2" r="2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="-1.5" cy="2" r="0.8" fill="#FFFFFF" opacity="0.5" />
              </g>

              {/* Bochechas fofas (se estiver curioso / perto) */}
              {isCurious && (
                <g className="pet-blush" fill="#FF7A18" opacity="0.65">
                  <ellipse cx="32" cy="59" rx="3.5" ry="2" />
                  <ellipse cx="68" cy="59" rx="3.5" ry="2" />
                </g>
              )}
            </g>
          )}

          {/* Boquinha / Expressão */}
          {isHappy ? (
            <path
              d="M 42 63 Q 50 71 58 63"
              stroke="#FFB020"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : isCurious ? (
            <ellipse cx="50" cy="63" rx="2.5" ry="3.5" fill="#FFB020" />
          ) : (
            <line
              x1="45"
              y1="64"
              x2="55"
              y2="64"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Badge identificador "KINECT TRACKER" */}
        <div className="pet-tag">
          <span className="pet-tag-dot" />
          <span className="pet-tag-text">BOT</span>
        </div>
      </div>

      {/* Botão sutil para minimizar/expandir se o usuário quiser */}
      <button
        type="button"
        className="pet-toggle-btn"
        onClick={() => setIsMinimized(!isMinimized)}
        aria-label={isMinimized ? 'Mostrar mascote' : 'Minimizar mascote'}
        title={isMinimized ? 'Expandir mascote' : 'Minimizar mascote'}
      >
        {isMinimized ? '🤖' : '−'}
      </button>
    </div>
  );
};

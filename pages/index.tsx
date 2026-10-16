import React, { useState } from 'react';
import Head from 'next/head';

interface Slot {
  slot_number: number;
  status: 'AVAILABLE' | 'RESERVED_PENDING_PAYMENT' | 'OCCUPIED';
  player_name?: string;
}

export default function Home() {
  const [activeDenom, setActiveDenom] = useState<number>(20);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winningSlot, setWinningSlot] = useState<number | null>(null);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [ballRotation, setBallRotation] = useState<number>(0);
  const [showReveal, setShowReveal] = useState<boolean>(false);
  
  const [slots, setSlots] = useState<Slot[]>(
    Array.from({ length: 20 }, (_, i) => ({
      slot_number: i + 1,
      status: 'AVAILABLE'
    }))
  );

  const filledCount = slots.filter(s => s.status === 'OCCUPIED').length;

  const prizes: Record<number, { first: number; second: number; third: number }> = {
    1:  { first: 10,  second: 5,  third: 5 },
    2:  { first: 20,  second: 10, third: 5 },
    5:  { first: 50,  second: 20, third: 10 },
    10: { first: 100, second: 40, third: 20 },
    20: { first: 200, second: 80, third: 40 },
  };

  const currentPrize = prizes[activeDenom] || prizes[20];

  const handleClaimSpot = (slotNum: number) => {
    const playerName = prompt(`Enter your name for Spot #${String(slotNum).padStart(2, '0')} ($${activeDenom} Entry):`);
    if (!playerName || playerName.trim() === '') return;

    setSlots(prev => prev.map(s => 
      s.slot_number === slotNum 
        ? { ...s, status: 'OCCUPIED', player_name: playerName.trim() } 
        : s
    ));
  };

  return (
    <div style={{ backgroundColor: '#080a0f', color: '#f5f5f5', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      <Head>
        <title>The Wheel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 2rem', background: '#0b0d10', borderBottom: '1px solid #d4af37' }}>
        <h1 style={{ fontSize: '2rem', margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Th<span style={{ display: 'inline-block', width: '22px', height: '22px', borderRadius: '50%', background: 'conic-gradient(#111 0deg 18deg, #8b0000 18deg 36deg, #111 36deg 54deg, #8b0000 54deg 72deg, #111 72deg 90deg, #8b0000 90deg 108deg)', border: '2px solid #d4af37' }} />e Wh<span style={{ display: 'inline-block', width: '22px', height: '22px', borderRadius: '50%', background: 'conic-gradient(#111 0deg 18deg, #8b0000 18deg 36deg, #111 36deg 54deg, #8b0000 54deg 72deg, #111 72deg 90deg, #8b0000 90deg 108deg)', border: '2px solid #d4af37' }} />el
        </h1>
        <div style={{ color: '#aaa', fontSize: '0.9rem' }}>
          ACTIVE DENOMINATION: <strong style={{ color: '#00e5ff', fontSize: '1.2rem' }}>${activeDenom}</strong>
        </div>
      </header>

      <main style={{ padding: '2rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Wheel Display */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <div style={{ width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, #1a1e29 40%, #080a0f 100%)', border: '10px solid #d4af37', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f5f5f5', border: '4px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: '900', fontSize: '1.4rem' }}>
              ${activeDenom}
            </div>
          </div>
        </div>

        {/* Winner Circle */}
        <section style={{ textAlign: 'center', margin: '3rem 0' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.2rem 0', color: '#fff' }}>WINNER CIRCLE</h2>
          <h3 style={{ fontSize: '1rem', color: '#d4af37', margin: '0 0 2rem 0' }}>THREE WINNERS EVERY ROUND</h3>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '1rem', height: '180px' }}>
            <div style={{ flex: 1, maxWidth: '180px' }}>
              <div style={{ fontSize: '2rem' }}>🥈</div>
              <div style={{ background: '#777', padding: '1rem 0', borderRadius: '8px 8px 0 0', height: '90px' }}>
                <div style={{ fontSize: '0.75rem', color: '#111', fontWeight: '800' }}>2ND PLACE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff' }}>${currentPrize.second}</div>
              </div>
            </div>

            <div style={{ flex: 1, maxWidth: '180px' }}>
              <div style={{ fontSize: '2.5rem' }}>🏆</div>
              <div style={{ background: '#d4af37', padding: '1rem 0', borderRadius: '8px 8px 0 0', height: '120px' }}>
                <div style={{ fontSize: '0.75rem', color: '#111', fontWeight: '800' }}>1ST PLACE</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>${currentPrize.first}</div>
              </div>
            </div>

            <div style={{ flex: 1, maxWidth: '180px' }}>
              <div style={{ fontSize: '2rem' }}>🥉</div>
              <div style={{ background: '#cd7f32', padding: '1rem 0', borderRadius: '8px 8px 0 0', height: '70px' }}>
                <div style={{ fontSize: '0.75rem', color: '#111', fontWeight: '800' }}>3RD PLACE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff' }}>${currentPrize.third}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Player Board */}
        <section style={{ margin: '3rem 0' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#fff', marginBottom: '2rem' }}>CHOOSE YOUR NUMBER</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {slots.map((slot) => {
              const formattedNum = String(slot.slot_number).padStart(2, '0');
              const isOccupied = slot.status === 'OCCUPIED';

              return (
                <div key={slot.slot_number} style={{ background: '#151922', border: '1px solid #d4af37', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#fff' }}>{formattedNum}</div>
                  <div style={{ marginTop: '0.5rem' }}>
                    {isOccupied ? (
                      <span style={{ color: '#00e5ff', fontWeight: '700' }}>{slot.player_name}</span>
                    ) : (
                      <button onClick={() => handleClaimSpot(slot.slot_number)} style={{ background: '#00e5ff', color: '#000', border: 'none', padding: '0.5rem 0.8rem', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', width: '100%' }}>
                        CLAIM SPOT ${activeDenom}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Waiting Banner */}
      <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: '#0f1219', border: '1px solid #d4af37', padding: '0.6rem 1.4rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '8px', height: '8px', background: '#00e5ff', borderRadius: '50%' }} />
        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#fff' }}>WAITING FOR PLAYERS</span>
        <span style={{ background: 'rgba(212,175,55,0.2)', color: '#d4af37', padding: '0.2rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem' }}>{filledCount} / 20 SPOTS FILLED</span>
      </div>
    </div>
  );
}


"use client";

/**
 * TEST PAGE - Minimal structure to debug width issue
 */
export default function InsightsPageTest() {
  return (
    <div style={{background: 'red', width: '100%', height: '100vh'}}>
      <div style={{background: 'blue', width: '100%', padding: '20px'}}>
        <h1>Test - Should be full width</h1>
        <p>If this blue box is full width, the issue is in my components.</p>
        <p>If this blue box is narrow, the issue is in the layout system.</p>
      </div>
    </div>
  );
}

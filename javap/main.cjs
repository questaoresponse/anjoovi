function measureExecutionTime() {
    const startTime = performance.now();

    // Código pesado: calcular fatorial várias vezes
    for (let i = 0; i < 100000; i++) {
        factorial(1000);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`Tempo de execução: ${duration.toFixed(2)} ms`);
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

measureExecutionTime();

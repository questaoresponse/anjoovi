#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Usando memoização para otimizar o cálculo de Fibonacci
#define MAX 100
long memo[MAX];

long fibonacciMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
    return memo[n];
}

// Função de QuickSort para ordenar um vetor
void quickSort(int array[], int low, int high);
int partition(int array[], int low, int high);

int partition(int array[], int low, int high) {
    int pivot = array[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (array[j] <= pivot) {
            i++;
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    int temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    return i + 1;
}

void quickSort(int array[], int low, int high) {
    if (low < high) {
        int pi = partition(array, low, high);
        quickSort(array, low, pi - 1);
        quickSort(array, pi + 1, high);
    }
}

int main() {
    int n = 30;
    long fibResult = 0;

    // Inicializa o vetor de memoização
    for (int i = 0; i < MAX; i++) {
        memo[i] = -1;
    }

    printf("Calculando Fibonacci...\n");
    for (int i = 0; i < 100; i++) {
        fibResult = fibonacciMemo(n);
    }
    printf("Fibonacci(%d) = %ld\n", n, fibResult);

    // Criando um vetor de números aleatórios para ordenar
    printf("Ordenando vetor...\n");
    clock_t startTime = clock();
    for (int in=0;in<100;in++){
        int array[50000];
        srand(time(NULL)); // Semente para números aleatórios
        for (int i = 0; i < 50000; i++) {
            array[i] = rand() % 100000;
        }

        // Calculando o tempo de ordenação
        quickSort(array, 0, 49999);
    }
    clock_t endTime = clock();

    printf("Vetor ordenado. Tempo de ordenação: %.2f ms\n", ((double)(endTime - startTime) / CLOCKS_PER_SEC) * 1000);

    return 0;
}

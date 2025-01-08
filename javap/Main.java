import java.util.*;

public class Main {

    // Usando memoização para otimizar o cálculo de Fibonacci
    private static final Map<Integer, Long> memo = new HashMap<>();

    public static long fibonacciMemo(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        long result = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
        memo.put(n, result);
        return result;
    }

    // Função de QuickSort para ordenar um vetor
    public static void quickSort(int[] array, int low, int high) {
        if (low < high) {
            int pi = partition(array, low, high);
            quickSort(array, low, pi - 1);
            quickSort(array, pi + 1, high);
        }
    }

    private static int partition(int[] array, int low, int high) {
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

    public static void main(String[] args) {
        int n = 30;
        long fibResult = 0;

        System.out.println("Calculando Fibonacci...");
        for (int i = 0; i < 100; i++) {
            fibResult = fibonacciMemo(n);
        }
        System.out.println("Fibonacci(" + n + ") = " + fibResult);

        // Criando um vetor de números aleatórios para ordenar
        System.out.println("Ordenando vetor...");
        long startTime = System.nanoTime();
        for (int in=0;in<100;in++){
            int[] array = new int[50000];
            Random rand = new Random();
            for (int i = 0; i < array.length; i++) {
                array[i] = rand.nextInt(100000);
            }

            quickSort(array, 0, array.length - 1);
        }
        long endTime = System.nanoTime();

        System.out.println("Vetor ordenado. Tempo de ordenação: " + (endTime - startTime) / 1_000_000.0 + " ms");
    }
}

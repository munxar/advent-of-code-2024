package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	s := bufio.NewScanner(os.Stdin)
	sum := 0
	for s.Scan() {
		number := extractNumber(s.Text())
		sum += int(number)
	}
	fmt.Printf("sum is: %d\n", sum)
}

func extractNumber(line string) uint8 {
	var first uint8
	var second uint8
	for i := 0; i < len(line); i++ {
		value := line[i] - '0'
		if value <= 9 {
			first = value
			break
		}
	}
	for i := len(line) - 1; i >= 0; i-- {
		value := line[i] - '0'
		if value <= 9 {
			second = value
			break
		}
	}
	return first*10 + second
}

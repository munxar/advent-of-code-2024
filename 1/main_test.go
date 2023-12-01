package main

import (
	"testing"
)

func TestExtract(t *testing.T) {
	got := extractNumber("9eightone")

	if got != 99 {
		t.Errorf("want 99, got %d", got)
	}
}

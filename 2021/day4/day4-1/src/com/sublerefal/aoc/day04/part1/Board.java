package com.sublerefal.aoc.day04.part1;

public class Board {
	private int boardSize;
	private int[] numbers;
	
	
	private boolean isWon = false;
	private int winningNumber = 0;
	private int lastCheckedNumber = -1;
	
	public Board(int[] numbers, int boardSize) {
		this.boardSize = boardSize;
		this.numbers = numbers;
		
	}
	
	public void markNumber(int number) {
		lastCheckedNumber = number;
		int index = -1;
		for(int i=0; i<numbers.length; i++) {
			if(numbers[i] == number) {
				numbers[i] = -1;
				index = i;
				break;
			}
		}
		if(index != -1) {
			checkForWinState(index);
		}
	}
	
	private void checkForWinState(int fromIndex) {
		checkForWinStateCol(fromIndex);
		checkForWinStateRow(fromIndex);
	}
	
	private void checkForWinStateRow(int fromIndex) {
		int rowStartIndex = ((int) (fromIndex / boardSize)) * boardSize;
		for(int i=rowStartIndex; i<rowStartIndex+boardSize; i++) {
			if(this.numbers[i] != -1) {
				return;
			}
		}
		this.winningNumber = lastCheckedNumber;
		this.isWon = true;
	}
	
	private void checkForWinStateCol(int fromIndex) {
		int columnStartIndex = fromIndex % boardSize;
		for(int i=columnStartIndex; i<this.numbers.length; i+=boardSize) {
			if(this.numbers[i] != -1) {
				return;
			}
		}
		this.winningNumber = lastCheckedNumber;
		this.isWon = true;
	}
	
	public boolean isWon() {
		return this.isWon;
	}
	
	public int calculateScore() {
		int sum = 0;
		System.out.println(numbers.length);
		for(int i=0; i<numbers.length; i++) {
			System.out.println("Checking " + numbers[i]);
			if(numbers[i] != -1) {
				sum += numbers[i];
			}
		}
		System.out.println("SUM " + sum);
		return sum * winningNumber;
	}
}

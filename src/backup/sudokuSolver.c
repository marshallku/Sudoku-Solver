#include <stdio.h>
#define Max 9
#define SubMax Max / 3

int grid[Max][Max];

void printGrid()
{
    int row, col;

    printf("\n┌──────────┬───────────┬──────────┐\n");
    for (row = 0; row < Max; row++)
    {
        printf("│");
        for (col = 0; col < Max; col++)
        {
            printf(" %d ", grid[row][col]);

            if (col == 2 || col == 5)
            {
                printf(" │ ");
            }
        }
        printf("│\n");

        if (row == 2 || row == 5)
        {
            printf("├──────────┼───────────┼──────────┤\n");
        }
    }
    printf("└──────────┴───────────┴──────────┘\n\n");
}

int isInRow(int row, int num)
{
    for (int i = 0; i < Max; i++)
    {
        if (num == grid[row][i])
            return 1;
    }

    return 0;
}

int isInCol(int col, int num)
{
    for (int i = 0; i < Max; i++)
    {
        if (num == grid[i][col])
            return 1;
    }

    return 0;
}

int isInSubGrid(int startRow, int startCol, int num)
{
    int i, j;

    for (i = startRow; i < startRow + SubMax; i++)
    {
        for (j = startCol; j < startCol + SubMax; j++)
        {
            if (grid[i][j] == num)
                return 1;
        }
    }

    return 0;
}

int isValid(int row, int col, int num)
{
    int m = SubMax;

    return !isInRow(row, num) && !isInCol(col, num) && !isInSubGrid(row - row % m, col - col % m, num);
}

int hasEmptyBox(int *row, int *col)
{
    for (*row = 0; *row < Max; *row += 1)
    {
        for (*col = 0; *col < Max; *col += 1)
        {
            if (grid[*row][*col] == 0)
                return 1;
        }
    }

    return 0;
}

int isSolvable()
{
    int row, col;
    int filled = 0;

    for (row = 0; row < Max; row++)
    {
        for (col = 0; col < Max; col++)
        {
            if (grid[row][col] != 0)
                filled++;
        }
    }

    return filled >= 17;
}

int solve()
{
    int row, col;

    if (!hasEmptyBox(&row, &col))
        return 1;

    for (int num = 1; num <= Max; num++)
    {
        if (isValid(row, col, num))
        {
            grid[row][col] = num;
            if (solve())
                return 1;
            grid[row][col] = 0;
        }
    }

    return 0;
}

int main(void)
{
    for (int i = 0; i < Max; i++)
    {
        for (int j = 0; j < Max; j++)
        {
            scanf("%d", &grid[i][j]);
        }
    }

    if (!isSolvable())
    {
        printf("It's undefeatable!");
    }
    else
    {
        if (solve())
            printGrid();
        else
            printf("Oops! I can't solve this.");
    }

    return 0;
}
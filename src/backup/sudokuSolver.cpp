// Original Code
#include <iostream>
const int g_max = 9;
const int g_subMax = g_max / 3;

/*

Sample Input

4 0 0 0 9 0 0 8 0
0 0 0 5 0 0 7 0 0
6 2 3 7 0 0 0 4 0
0 4 9 0 0 0 0 7 3
0 0 0 0 0 0 0 0 0
7 6 0 0 0 0 9 2 0
0 3 0 0 0 2 4 1 5
0 0 2 0 0 6 0 0 0
0 1 0 0 5 0 0 0 7

*/

int grid[g_max][g_max];

void printGrid()
{
    int row, col;

    printf("\n┌──────────┬───────────┬──────────┐\n");
    for (row = 0; row < g_max; row++)
    {
        printf("│");
        for (col = 0; col < g_max; col++)
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

bool isInRow(int row, int num)
{
    for (int i = 0; i < g_max; i++)
    {
        if (num == grid[row][i])
            return true;
    }

    return false;
}

bool isInCol(int col, int num)
{
    for (int i = 0; i < g_max; i++)
    {
        if (num == grid[i][col])
            return true;
    }

    return false;
}

bool isInSubGrid(int startRow, int startCol, int num)
{
    int i, j;

    for (i = startRow; i < startRow + g_subMax; i++)
    {
        for (j = startCol; j < startCol + g_subMax; j++)
        {
            if (grid[i][j] == num)
                return true;
        }
    }

    return false;
}

bool isValid(int row, int col, int num)
{
    return !isInRow(row, num) && !isInCol(col, num) && !isInSubGrid(row - row % g_subMax, col - col % g_subMax, num);
}

bool hasEmptyBox(int &row, int &col)
{
    for (row = 0; row < g_max; row++)
    {
        for (col = 0; col < g_max; col++)
        {
            if (grid[row][col] == 0)
                return true;
        }
    }

    return false;
}

bool isSolvable()
{
    int row, col;
    int filled = 0;

    for (row = 0; row < g_max; row++)
    {
        for (col = 0; col < g_max; col++)
        {
            if (grid[row][col] != 0)
                filled++;
        }
    }

    return filled >= 17;
}

bool solve()
{
    int row, col;

    if (!hasEmptyBox(row, col))
        return true;

    for (int num = 1; num <= g_max; num++)
    {
        if (isValid(row, col, num))
        {
            grid[row][col] = num;
            if (solve())
                return true;
            grid[row][col] = 0;
        }
    }

    return false;
}

int main(void)
{
    for (int i = 0; i < g_max; i++)
    {
        for (int j = 0; j < g_max; j++)
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
import { useMemo } from 'react'
import { TransactionsContext } from '../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(
    () =>
      transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === 'income') {
            acc.income += transaction.price
            acc.total += transaction.price
          } else {
            acc.outcome += transaction.price
            acc.total -= transaction.price
          }

          return acc
        },
        {
          total: 0,
          income: 0,
          outcome: 0,
        },
      ),
    [transactions],
  )

  return summary
}

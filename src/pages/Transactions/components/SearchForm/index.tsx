import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'
// import { memo } from 'react'

/* Por que um componente renderiza?
 *
 * - Hooks changed (mudou estado, contexto, reducer)
 * - Props changed (mudou propriedades)
 * - Parent rerendered (componente pai renderizou)
 *
 * Qual o fluxo de renderização?
 * 1. O react recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML recriado com a versão anterior
 * 3. Se mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo:
 * 0. Hooks changed (mudou estado, contexto, reducer), Props changed (mudou propriedades, deep comparison)
 * 0.1. Comparar a versão anterior dos hooks e props
 * 0.2. Se mudou alguma coisa, ele vai permitir a nova renderização
 *
 */

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

// Exemplo de uso do memo
// function SearchFormComponent() {
//   const fetchTransactions = useContextSelector(
//     TransactionsContext,
//     (context) => {
//       return context.fetchTransactions
//     },
//   )
//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<SearchFormInputs>({
//     resolver: zodResolver(searchFormSchema),
//   })

//   async function handleSearchTransactions(data: SearchFormInputs) {
//     await fetchTransactions(data.query)
//   }

//   return (
//     <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
//       <input
//         type="text"
//         placeholder="Busque por transações"
//         {...register('query')}
//       />
//       <button type="submit" disabled={isSubmitting}>
//         <MagnifyingGlass size={20} />
//         Buscar
//       </button>
//     </SearchFormContainer>
//   )
// }

// export const SearchForm = memo(SearchFormComponent)

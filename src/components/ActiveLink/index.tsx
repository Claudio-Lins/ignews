import Link, {LinkProps} from 'next/link'
import { useRouter } from 'next/router';
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeCassName: string;
}

export default function ActiveLink( { children, activeCassName, ...rest }: ActiveLinkProps) {
  const {asPath} = useRouter()

  const className = asPath === rest.href
  ? activeCassName
  : ''

  return (
    <Link {...rest}>
    {cloneElement(children, {
      className,
    })}
    </Link>
  )
}

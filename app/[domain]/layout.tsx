import { ReactNode } from "react"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { domain: string }
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain)

  const title = domain
  const description = "Subdomain of ui.3dubs.in"
  return {
    title: domain,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@jayshiai",
    },
    metadataBase: new URL(`https://${domain}`),
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   data.customDomain && {
    //     alternates: {
    //       canonical: `https://${data.customDomain}`,
    //     },
    //   }),
  }
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string }
  children: ReactNode
}) {
  return <div>{children}</div>
}

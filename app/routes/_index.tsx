import type { V2_MetaFunction } from '@remix-run/cloudflare'
import { Kysely } from 'kysely'
import { NeonDialect } from 'kysely-neon'

export async function loader() {
	interface UsersTable {
		id: string
		email: string
	}

	interface Database {
		users: UsersTable
	}

	const db = new Kysely<Database>({
		dialect: new NeonDialect({
			connectionString: '',
		}),
	})

	const { countAll } = db.fn
	const result = await db.selectFrom('users').select(countAll().as('total')).executeTakeFirst()
	console.log(result)

	return null
}

export const meta: V2_MetaFunction = () => {
	return [{ title: 'New Remix App' }]
}

export default function Index() {
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			<h1>Welcome to Remix</h1>
			<ul>
				<li>
					<a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
						15m Quickstart Blog Tutorial
					</a>
				</li>
				<li>
					<a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
						Deep Dive Jokes App Tutorial
					</a>
				</li>
				<li>
					<a target="_blank" href="https://remix.run/docs" rel="noreferrer">
						Remix Docs
					</a>
				</li>
			</ul>
		</div>
	)
}

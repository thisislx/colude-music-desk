import { saga as music } from './music'
import { saga as user } from './user'
import { saga as songMenu } from './song-menu'
import { saga as song } from './song'
import { saga as global } from './global'
import { saga as search } from './search'
import { saga as banner } from './banner'
import { saga as mv } from './mv'

export default function* () {
    yield* global()
    yield* music()
    yield* user()
    yield* songMenu()
    yield* song()
    yield* search()
    yield* banner()
    yield* mv()
}
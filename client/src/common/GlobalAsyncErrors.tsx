import { useAppState } from "../state";

export default function GlobalAsyncErrors() {
  const [state] = useAppState()
   
	return state.asyncErrors.map((error) => {
		<div>
			{error.key}
			{error.status}
			{error.description}
		</div>
	})
}
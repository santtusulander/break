import Container from '../common/Container'
import { Course } from './types'
import { CourseRow, SearchInput, CoursesCard, SearchIconElement, SearchInputCard } from './components'
import useSWRWithState from '../common/hooks/useSWRWithState'
import { useState } from 'react'

export default function Courses() {

	const {isValidating, data: courses = []} = useSWRWithState<Course[]>('/courses')

	const [searchValue, setSearch] = useState('')

	const onSearchChange = (e: any) => {

		setSearch(e?.target?.value || '')
	}

	const filteredCourses = [...courses, ...courses, ...courses, ...courses]?.filter(({courseName}) => {

		return courseName.toLowerCase()
			.includes(
				searchValue.toLowerCase()
			)
	})

  return (
    <Container>
			<SearchInputCard>
				<SearchIconElement />
				<SearchInput type="text" value={searchValue} onChange={onSearchChange}></SearchInput>
			</SearchInputCard>
			
			{searchValue.length && filteredCourses?.length ?
			<CoursesCard>
				{filteredCourses?.map((({courseName, holesCount}, i) => {
					return (
						<CourseRow key={i}>
							<p>{courseName}</p>
							<p>{holesCount} holes</p>
						</CourseRow>
					)
				}))}
			</CoursesCard>
			: searchValue.length && !filteredCourses?.length
				? <p>You sure about '{searchValue}'? No courses found.</p>
				: undefined
			}
    </Container>
  )
}
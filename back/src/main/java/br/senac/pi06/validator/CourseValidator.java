package br.senac.pi06.validator;

import br.senac.pi06.exception.CourseException;
import br.senac.pi06.model.Course;
import br.senac.pi06.util.Util;

public class CourseValidator {
	
	public static Exception validate(Course course) {

		// NOT NULL
		if (Util.empty(course.getName()))
			return new CourseException("O nome eh obrigatorio.");
	
		return null;
	
	}

}

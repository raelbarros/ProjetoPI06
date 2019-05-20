package br.senac.pi06.validator;

import br.senac.pi06.exception.CollegeException;
import br.senac.pi06.model.College;
import br.senac.pi06.util.Util;

public class CollegeValidator {
	public static CollegeException validate(College college) {

		// NOT NULL
		if (Util.empty(college.getName()))
			return new CollegeException("O nome da instuição é obrigatorio.");

		if (Util.empty(college.getTipo()))
			return new CollegeException("O tipo da instuição é obrigatorio.");
		
//		if (Util.empty(college.getCidade()))
//			return new CollegeException("A cidade é obrigatoria.");
//
//		if (Util.empty(college.getEstado()))
//			return new CollegeException("O estado é obrigatorio.");
//		
		return null;

	}
}

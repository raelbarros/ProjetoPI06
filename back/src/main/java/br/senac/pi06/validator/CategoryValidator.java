package br.senac.pi06.validator;

import br.senac.pi06.exception.CategoryException;
import br.senac.pi06.model.Category;
import br.senac.pi06.util.Util;

public class CategoryValidator {

	public static CategoryException validate(Category c) {

		// NOT NULL
		if (Util.empty(c.getName()))
			return new CategoryException("Categoria eh obrigatorio.");

		return null;

	}
}
package br.senac.pi06.util;

import java.util.Calendar;
import java.util.Date;

import org.apache.commons.validator.routines.EmailValidator;

public class Util {

	public static boolean empty(final String s) {
		// Null-safe, short-circuit evaluation.
		return s == null || s.trim().isEmpty();
	}

	public static boolean isDate(final Calendar d) {
		Calendar cal = Calendar.getInstance();
		cal.setLenient(false);
		cal.setTime(d.getTime());
		try {
			cal.getTime();
			return true;
		}
		catch (Exception e) {
			return false;
		}
	}

	public static boolean isDate(final Date d) {
		Calendar cal = Calendar.getInstance();
		cal.setLenient(false);
		cal.setTime(d);
		try {
			cal.getTime();
			return true;
		}
		catch (Exception e) {
			return false;
		}
	}

	public static Date getDateNow(){
		return  new Date();
	}

	public static boolean isValidEmailAddress(String email) {
		return EmailValidator.getInstance().isValid(email);
	}

}

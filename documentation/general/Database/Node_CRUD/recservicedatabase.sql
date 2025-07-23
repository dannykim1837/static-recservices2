-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema recservices
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema recservices
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `recservices` DEFAULT CHARACTER SET utf8 ;
USE `recservices` ;

-- -----------------------------------------------------
-- Table `recservices`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recservices`.`employees` (
  `employee_id` INT NOT NULL,
  `first` VARCHAR(45) NOT NULL,
  `last` VARCHAR(45) NOT NULL,
  `position` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `group` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `wage` INT NULL,
  `Salary` TINYINT(1) NULL,
  PRIMARY KEY (`employee_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recservices`.`shift`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recservices`.`shift` (
  `idShift` INT NOT NULL,
  `start` DATETIME NULL,
  `end` DATETIME NULL,
  `employees_employee_id` INT NOT NULL,
  `upfortrade` TINYINT NOT NULL,
  PRIMARY KEY (`idShift`),
  INDEX `fk_Shift_Employees_idx` (`employees_employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_Shift_Employees`
    FOREIGN KEY (`employees_employee_id`)
    REFERENCES `recservices`.`employees` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recservices`.`password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recservices`.`password` (
  `pass_hash` VARCHAR(45) NOT NULL,
  `employees_employee_id` INT NOT NULL,
  `salt` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pass_hash`, `employees_employee_id`),
  INDEX `fk_Password_Employees1_idx` (`employees_employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_Password_Employees1`
    FOREIGN KEY (`employees_employee_id`)
    REFERENCES `recservices`.`employees` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recservices`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recservices`.`department` (
  `id` INT NOT NULL,
  `address*(split_into_parts)` VARCHAR(45) NULL,
  `number_of_employees` INT NULL,
  `name` VARCHAR(45) NULL,
  `employees_employee_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Department_Employees1_idx` (`employees_employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_Department_Employees1`
    FOREIGN KEY (`employees_employee_id`)
    REFERENCES `recservices`.`employees` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recservices`.` position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recservices`.` position` (
  `id_position` INT NOT NULL,
  `nameofposition` VARCHAR(45) NULL,
  `number of people` INT NULL,
  `employees_employee_id` INT NOT NULL,
  PRIMARY KEY (`id_position`),
  INDEX `fk_ position_Employees1_idx` (`employees_employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_ position_Employees1`
    FOREIGN KEY (`employees_employee_id`)
    REFERENCES `recservices`.`employees` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE DATABASE  IF NOT EXISTS `cafe_mgmt` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cafe_mgmt`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: localhost    Database: cafe_mgmt
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cafe_employees`
--

DROP TABLE IF EXISTS `cafe_employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafe_employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cafe_id` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `employee_id` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `start_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_cafe_emp` (`cafe_id`,`employee_id`),
  KEY `FK_employee_master` (`employee_id`),
  CONSTRAINT `FK_cafe_master` FOREIGN KEY (`cafe_id`) REFERENCES `cafe_master` (`id`),
  CONSTRAINT `FK_employee_master` FOREIGN KEY (`employee_id`) REFERENCES `employee_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe_employees`
--

LOCK TABLES `cafe_employees` WRITE;
/*!40000 ALTER TABLE `cafe_employees` DISABLE KEYS */;
INSERT INTO `cafe_employees` (`id`, `cafe_id`, `employee_id`, `start_date`) VALUES (1,'8b31d732-c6c3-457c-9487-4077a1311f07','UIc33f755','2023-09-10'),(2,'b2852940-68a9-47f8-982e-1e64cfd5f4cf','UI1d5a750','2023-09-09'),(3,'8b31d732-c6c3-457c-9487-4077a1311f07','UI41d8d4b','2023-09-11');
/*!40000 ALTER TABLE `cafe_employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cafe_master`
--

DROP TABLE IF EXISTS `cafe_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafe_master` (
  `id` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `name` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `description` varchar(250) COLLATE utf8mb3_bin NOT NULL,
  `logo` blob,
  `location` varchar(200) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafe_master`
--

LOCK TABLES `cafe_master` WRITE;
/*!40000 ALTER TABLE `cafe_master` DISABLE KEYS */;
INSERT INTO `cafe_master` (`id`, `name`, `description`, `logo`, `location`) VALUES ('710fc6c9-3ca6-4610-8676-0a1dcf3c2039','Bestie Cafe','For all the BFFs',NULL,'New York'),('8b31d732-c6c3-457c-9487-4077a1311f07','ABC Coffee','Best coffee in the city',NULL,'Mumbai'),('b2852940-68a9-47f8-982e-1e64cfd5f4cf','Kopi Cafe','Special drink',NULL,'Singapore');
/*!40000 ALTER TABLE `cafe_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_master`
--

DROP TABLE IF EXISTS `employee_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_master` (
  `id` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `name` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `email_address` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `phone_number` bigint NOT NULL,
  `gender` varchar(10) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_master`
--

LOCK TABLES `employee_master` WRITE;
/*!40000 ALTER TABLE `employee_master` DISABLE KEYS */;
INSERT INTO `employee_master` (`id`, `name`, `email_address`, `phone_number`, `gender`) VALUES ('UI1d5a750','Mary Jane','jane.m98@gmail.com',88997665,'Female'),('UI41d8d4b','John Snow','johnsnow@gmail.com',87678986,'Male'),('UIa5248a0','Mohammad Siraj','siraj@gmail.com',98765678,'Male'),('UIc33f755','Kamala Khan','khan.kamala@gmail.com',98765675,'Female'),('UIde4ea29','Jones Hills','hills.jones@gmail.com',98767898,'Male');
/*!40000 ALTER TABLE `employee_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-11 21:59:38

-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: barondelacerveza
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Lager'),(2,'Black IPA'),(3,'Cerveza Negra'),(4,'Dorada Original'),(5,'IPA'),(6,'Clasica');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `city` varchar(350) CHARACTER SET utf8mb4 DEFAULT NULL,
  `phone` varchar(350) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contacts_FK` (`userId`),
  CONSTRAINT `contacts_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (12,'calle falsa 123','buenos aires',29,'buenos aires','011 ');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `alcoholContent` decimal(10,0) DEFAULT NULL,
  `outstanding` tinyint(1) DEFAULT NULL,
  `images` varchar(100) DEFAULT NULL,
  `trademark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `category_idx` (`categoryId`),
  CONSTRAINT `category` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (124,'Happy Lager',120,10,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',1,'2021-10-15 01:14:34','2021-10-15 01:14:34',0,1,'img1.jpg','Patagonia'),(125,'Dark Vader',205,10,'Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. ',2,'2021-10-15 01:16:03','2021-10-15 01:16:03',10,1,'img2.png','BierHause'),(126,'Notre',210,10,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',3,'2021-10-15 01:16:42','2021-10-15 01:16:42',30,1,'img3.png','Stella Artois'),(127,'Clasica',210,0,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',4,'2021-10-15 01:17:17','2021-10-15 01:17:17',21,1,'img4.png','Brahma'),(128,'Fernandez IPA',210,20,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',5,'2021-10-15 01:17:45','2021-10-15 01:17:45',23,1,'img5.png','Patagonia'),(129,'Brahma Chop',150,15,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',6,'2021-10-15 01:18:32','2021-10-15 01:18:32',23,1,'img6.png','Brahma'),(130,'Andes Origen',250,0,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',3,'2021-10-15 01:19:16','2021-10-15 01:19:16',12,1,'img7.png','Andes'),(131,'Black Mamba',300,0,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n\r\n',3,'2021-10-15 01:19:51','2021-10-15 01:19:51',0,1,'img8.png','Grunge'),(132,'Quilmes Clasica',150,0,' Cerveza estilo New England IPA. Se caracteriza por su intenso aroma de lúpulos del nuevo Mundo y de su bajo amargor. Lleva trigo malteado para dar su característica opalescencia. Altamente refrescante, frutal y de muy fácil tomabilidad. \r\n',6,'2021-10-15 01:20:34','2021-10-15 01:20:34',0,1,'img9.jpg','Quilmes');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (23,'Jonatan','admin@admin.com','$2a$12$FjDPu61/JRRADiF0qb8Aq..zoEMGWY4yFT34CQPq3HJwFAY9TfFYq',1,'2021-10-13 21:53:46','2021-10-13 21:53:46','avatar-default.png'),(29,'Jonatan','email@email.com','$2a$12$vzlT7RnGODIRgVwsoJ2hue5S5Ts1rW9okdwMCMT8.WNRRYfEtfX8S',0,'2021-10-14 22:37:27','2021-10-14 22:43:25','avatar-default.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'barondelacerveza'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-15  3:22:31

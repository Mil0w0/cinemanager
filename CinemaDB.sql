-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-db
-- Generation Time: May 11, 2024 at 10:03 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CinemaDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `releaseDate` datetime NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `title`, `duration`, `releaseDate`, `category`) VALUES
(19, 'Challengers', 127, '2024-04-08 00:00:00', 'Sport'),
(20, 'HP et la coupe de feu', 200, '2024-04-08 00:00:00', 'Magic'),
(21, 'Monstres & Cie', 180, '2004-04-08 00:00:00', 'Pixar'),
(22, 'Les aventures de Pommes', 300, '2024-05-05 00:00:00', 'Best Seller'),
(23, 'Les aventures de Pommes 2', 302, '2024-07-05 00:00:00', 'Best Seller de ouf'),
(24, 'Les aventures de Pommes 3 : La revenche des Poires', 500, '2024-09-05 00:00:00', 'Best Movie of All Time'),
(25, 'Jurassic Pomme', 500, '2000-09-11 00:00:00', 'Dinosaurs'),
(26, 'LaLaPomme', 200, '2022-05-01 00:00:00', 'Music'),
(27, 'JuJustu Pomme : The Movie', 200, '2024-10-11 00:00:00', 'Anime'),
(28, 'Titanic (feat : Pomme)', 200, '1999-10-11 00:00:00', 'Tragedie'),
(29, 'Le seigneurs des pommes', 200, '2003-07-01 00:00:00', 'Science-fiction');

-- --------------------------------------------------------

--
-- Table structure for table `picture`
--

CREATE TABLE `picture` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `roomId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `picture`
--

INSERT INTO `picture` (`id`, `name`, `url`, `roomId`) VALUES
(6, 'Second picture', 'https://secure.server/images/rooms/insideRoom.png', 4),
(7, 'First picture', 'https://secure.server/images/rooms/coolPicture.png', 5),
(8, 'First picture', 'https://secure.server/images/rooms/pomme.png', 6),
(9, 'Second picture', 'https://secure.server/images/rooms/pommeBis.png', 6),
(10, 'First picture', 'https://secure.server/images/rooms/poire.png', 7),
(11, 'Second picture', 'https://secure.server/images/rooms/poire2.png', 7),
(12, 'First picture', 'https://secure.server/images/rooms/orange.png', 9),
(13, 'First picture', 'https://secure.server/images/rooms/sideView.png', 12);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `maxCapacity` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `isAvailable` tinyint NOT NULL DEFAULT '0',
  `hasDisabledAccess` tinyint NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL DEFAULT 'standard'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `name`, `maxCapacity`, `description`, `isAvailable`, `hasDisabledAccess`, `type`) VALUES
(4, '27 club room', 30, 'This is the 27 club special room', 1, 0, 'standard'),
(5, 'Lone Room', 30, 'The Famous Lone Room', 1, 1, 'vip'),
(6, 'Blue Room', 30, 'A really blue room', 1, 1, 'standart'),
(7, 'Red Room', 30, 'A really red room', 1, 1, 'standard'),
(8, 'Yellow Room', 15, 'A really yellow room', 1, 1, 'standard'),
(9, 'Brown Room', 20, 'A really brown room', 1, 1, 'standard'),
(10, 'Orange Room', 25, 'A really orange room', 1, 1, 'standard'),
(11, 'Wood Room', 15, 'A really woody room', 1, 0, 'standard'),
(12, 'Disney Room', 15, 'A room for disney movies', 1, 1, 'disney'),
(13, 'Pixar Room', 30, 'A room for pixar movies', 1, 1, 'pixar');

-- --------------------------------------------------------

--
-- Table structure for table `screening`
--

CREATE TABLE `screening` (
  `id` int NOT NULL,
  `duration` int NOT NULL,
  `startingTime` datetime NOT NULL,
  `movieId` int DEFAULT NULL,
  `roomId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `screening`
--

INSERT INTO `screening` (`id`, `duration`, `startingTime`, `movieId`, `roomId`) VALUES
(27, 300, '2024-05-13 14:00:00', 21, 8),
(28, 300, '2024-05-13 14:00:00', 21, 9),
(29, 350, '2024-05-13 14:00:00', 23, 10),
(30, 350, '2024-05-13 14:00:00', 23, 11),
(31, 350, '2024-05-13 14:00:00', 28, 13),
(32, 350, '2024-05-13 14:00:00', 28, 5),
(33, 350, '2024-05-12 14:00:00', 28, 5),
(34, 350, '2024-05-14 14:00:00', 28, 5),
(35, 350, '2024-05-11 14:00:00', 28, 5),
(36, 350, '2024-05-11 14:00:00', 28, 7),
(37, 350, '2024-05-11 14:00:00', 28, 9),
(38, 350, '2024-05-11 14:00:00', 28, 11),
(39, 350, '2024-05-10 14:00:00', 22, 9),
(40, 350, '2024-05-10 14:00:00', 22, 10),
(41, 350, '2024-05-10 14:00:00', 22, 12),
(42, 400, '2024-05-10 14:00:00', 19, 4),
(43, 400, '2024-05-10 14:00:00', 19, 7),
(44, 400, '2024-05-10 14:00:00', 19, 9),
(45, 400, '2024-05-10 14:00:00', 27, 11),
(46, 400, '2024-05-10 14:00:00', 27, 12),
(47, 400, '2024-05-09 14:00:00', 27, 12),
(48, 400, '2024-05-09 14:00:00', 27, 11),
(49, 400, '2024-05-09 14:00:00', 26, 13),
(50, 400, '2024-05-09 14:00:00', 26, 8),
(51, 400, '2024-05-09 14:00:00', 26, 5),
(52, 350, '2024-05-13 16:00:00', 23, 7),
(53, 350, '2024-05-14 16:00:00', 23, 11),
(54, 350, '2024-05-14 16:00:00', 23, 8),
(55, 350, '2024-05-15 16:00:00', 21, 8),
(56, 350, '2024-05-15 16:00:00', 21, 13),
(57, 350, '2024-05-16 16:00:00', 19, 13),
(58, 350, '2024-05-16 16:00:00', 19, 12),
(59, 350, '2024-05-17 16:00:00', 20, 12),
(60, 350, '2024-05-17 16:00:00', 20, 5),
(61, 350, '2024-05-18 16:00:00', 19, 5),
(62, 350, '2024-05-18 16:00:00', 19, 9),
(63, 350, '2024-05-19 16:00:00', 27, 9),
(64, 350, '2024-05-19 16:00:00', 27, 5),
(65, 350, '2024-05-20 16:00:00', 26, 5),
(66, 350, '2024-05-20 16:00:00', 26, 6),
(67, 350, '2024-05-21 16:00:00', 27, 6),
(68, 350, '2024-05-21 16:00:00', 27, 7),
(69, 350, '2024-05-22 16:00:00', 28, 7),
(70, 350, '2024-05-22 16:00:00', 28, 8),
(71, 350, '2024-05-23 16:00:00', 29, 8),
(72, 350, '2024-05-23 16:00:00', 29, 9),
(73, 350, '2024-05-24 16:00:00', 20, 9),
(74, 350, '2024-05-24 16:00:00', 20, 10),
(75, 350, '2024-05-25 16:00:00', 21, 10),
(76, 350, '2024-05-25 16:00:00', 21, 12),
(77, 350, '2024-05-26 16:00:00', 22, 12),
(78, 350, '2024-05-26 16:00:00', 22, 11),
(79, 350, '2024-05-27 16:00:00', 23, 11),
(80, 350, '2024-05-27 16:00:00', 23, 12),
(81, 350, '2024-05-28 16:00:00', 21, 12),
(82, 350, '2024-05-28 16:00:00', 21, 13),
(83, 350, '2024-05-29 16:00:00', 19, 8),
(84, 350, '2024-05-30 16:00:00', 20, 8),
(85, 350, '2024-05-30 16:00:00', 20, 9),
(86, 350, '2024-05-31 16:00:00', 22, 9),
(87, 350, '2024-05-31 16:00:00', 22, 10),
(88, 350, '2024-06-01 16:00:00', 23, 10),
(89, 350, '2024-06-01 16:00:00', 23, 11),
(90, 350, '2024-06-02 16:00:00', 27, 11),
(91, 350, '2024-06-02 16:00:00', 27, 13),
(92, 350, '2024-06-03 16:00:00', 19, 13),
(93, 350, '2024-06-03 16:00:00', 19, 5),
(94, 350, '2024-06-04 16:00:00', 20, 5),
(95, 350, '2024-06-04 16:00:00', 20, 6),
(96, 350, '2024-06-05 16:00:00', 28, 6),
(97, 350, '2024-06-05 16:00:00', 28, 7),
(98, 350, '2024-06-06 16:00:00', 27, 7),
(99, 350, '2024-06-06 16:00:00', 27, 8),
(100, 350, '2024-06-07 16:00:00', 26, 8),
(101, 350, '2024-06-07 16:00:00', 26, 9),
(102, 250, '2024-06-08 16:00:00', 26, 9),
(103, 250, '2024-06-08 16:00:00', 26, 10),
(104, 350, '2024-06-09 16:00:00', 23, 10),
(105, 350, '2024-06-09 16:00:00', 23, 9),
(106, 350, '2024-06-10 16:00:00', 20, 9),
(107, 350, '2024-06-10 16:00:00', 20, 10),
(108, 350, '2024-06-11 16:00:00', 21, 10),
(109, 350, '2024-06-11 16:00:00', 21, 9),
(110, 350, '2024-06-12 16:00:00', 27, 9),
(111, 350, '2024-06-12 16:00:00', 27, 10),
(112, 350, '2024-06-13 16:00:00', 22, 10),
(113, 350, '2024-06-13 16:00:00', 22, 12);

-- --------------------------------------------------------

--
-- Table structure for table `screening_tickets_ticket`
--

CREATE TABLE `screening_tickets_ticket` (
  `screeningId` int NOT NULL,
  `ticketId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `screening_tickets_ticket`
--

INSERT INTO `screening_tickets_ticket` (`screeningId`, `ticketId`) VALUES
(27, 2),
(27, 3),
(28, 3),
(29, 2),
(29, 3),
(30, 3),
(31, 2),
(31, 3),
(32, 3),
(32, 6),
(33, 2),
(33, 3),
(34, 3),
(34, 6),
(35, 2),
(35, 3),
(35, 6),
(36, 3),
(36, 4),
(37, 2),
(37, 4),
(38, 4),
(38, 6),
(39, 2),
(39, 4),
(39, 6),
(40, 4),
(40, 6),
(41, 2),
(41, 4),
(41, 6),
(42, 4),
(42, 5),
(42, 6),
(43, 2),
(43, 4),
(43, 6),
(44, 4),
(44, 6),
(45, 2),
(45, 4),
(45, 6),
(46, 6),
(47, 6),
(48, 6),
(49, 6),
(50, 5),
(62, 6),
(63, 6),
(64, 6),
(65, 6),
(71, 5),
(73, 6),
(74, 6),
(75, 6),
(78, 5),
(78, 6),
(79, 6),
(80, 6),
(82, 6),
(83, 6),
(85, 6),
(88, 6),
(90, 5),
(93, 5),
(95, 5),
(98, 5),
(100, 5),
(102, 5);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `id` int NOT NULL,
  `entriesLeft` int NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `buyDate` datetime NOT NULL,
  `ticketTypeId` int DEFAULT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id`, `entriesLeft`, `price`, `buyDate`, `ticketTypeId`, `userId`) VALUES
(2, 0, 7.99, '2023-05-01 00:00:00', 4, 4),
(3, 0, 7.99, '2023-05-01 00:00:00', 4, 5),
(4, 0, 7.99, '2023-05-01 00:00:00', 4, 6),
(5, 0, 7.99, '2023-05-01 00:00:00', NULL, NULL),
(6, 0, 7.99, '2023-05-01 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_type`
--

CREATE TABLE `ticket_type` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `maxEntries` int NOT NULL,
  `price` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ticket_type`
--

INSERT INTO `ticket_type` (`id`, `name`, `maxEntries`, `price`) VALUES
(2, 'Billet normal', 1, 13.00),
(3, 'Billet super', 5, 50.00),
(4, 'Billet ultra', 10, 80.00),
(5, 'Billet magique', 99, 300.00);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `amount`, `createdAt`, `userId`) VALUES
(1, 100.00, '2024-05-10 16:49:56', 4),
(2, -7.99, '2024-05-10 17:03:00', 4),
(3, 1000.00, '2024-05-10 17:10:49', 5),
(4, -7.99, '2024-05-10 17:11:38', 5),
(5, 1000.00, '2024-05-10 17:22:27', 6),
(6, -7.99, '2024-05-10 17:22:32', 6),
(7, -7.99, '2024-05-11 11:26:33', 6),
(8, 1000.00, '2024-05-11 11:58:19', 10),
(9, -7.99, '2024-05-11 11:58:46', 10);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `surname` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `birthDate` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `loginToken` varchar(255) DEFAULT NULL,
  `roles` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `surname`, `firstName`, `birthDate`, `email`, `password`, `loginToken`, `roles`) VALUES
(3, 'Admin', 'Admin', '2000-01-01 00:00:00', 'admin@myges.fr', '$2b$10$S8QyoKpElUi5DnS.YcgqmeCJv0URNpeI70.GgyoM3J64RhWFHyXwS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiYWRtaW5AbXlnZXMuZnIiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNzE1NDE5NjE0LCJleHAiOjE3MTU0MjY4MTR9.YnYzH1wD03UEhCSURwqZEm22jO8vOnorum0ZgXMGl-g', 'admin'),
(4, 'User', 'Nino', '2002-02-25 00:00:00', 'nino@myges.fr', '$2b$10$r4M9Ktl2DnwzaXKF6RDqLOQP4J.hAhTXtcpytkEitUmZ03367AMxC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoibmlub0BteWdlcy5mciIsInJvbGVzIjoidXNlciIsImlhdCI6MTcxNTM1MjM2NiwiZXhwIjoxNzE1MzU5NTY2fQ.oD-X7f7yRrlAb8vGubt8jfLoLOVhW0W7PQvy1kC3F5Q', 'user'),
(5, 'User', 'Clarence', '2002-02-25 00:00:00', 'clarence@myges.fr', '$2b$10$1NiZPQu2TzhNekfOM2/BXujatXUrePKGZyrQK3w5Bhu79txO9TrLu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoiY2xhcmVuY2VAbXlnZXMuZnIiLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE3MTUzNTM4MjAsImV4cCI6MTcxNTM2MTAyMH0.tekG01NvNG6Xxg-FDf3SH67FMo__EdsUbkszY-I5hI8', 'user'),
(6, 'User', 'Loriane', '2002-02-25 00:00:00', 'loriane@myges.fr', '$2b$10$Xu5HdoD02BjtIfWuIra7gutqrRjyB.03AVyi2nXsImHMP71k/Yn7K', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImVtYWlsIjoibG9yaWFuZUBteWdlcy5mciIsInJvbGVzIjoidXNlciIsImlhdCI6MTcxNTQxOTQ5NywiZXhwIjoxNzE1NDI2Njk3fQ.t_32IZn7EuXIyGv9UYbx4C6d3F8rtxQY-MKML0UyfVw', 'user'),
(7, 'User', 'Milo', '2002-02-25 00:00:00', 'milo@myges.fr', '$2b$10$hzAdambiLgAjgkflPA9CPucWm0xmZN56IISRIJ216qQ9bXeTkpbWu', NULL, 'user'),
(8, 'User', 'Rémy', '2002-02-25 00:00:00', 'rémy@myges.fr', '$2b$10$qG1oFiwdxWt11/ro1LeDi.6AtUMgsy63dmoif3B/H3osSuOSA0Qhu', NULL, 'user'),
(9, 'User', 'Frédéric', '2002-02-25 00:00:00', 'frédéric@myges.fr', '$2b$10$qc/p.TDrU2sbQtr6C38XDufz/SgvdvHYhgLNaYWV7pIIX0Xj.RQTW', NULL, 'user'),
(10, 'User', 'Lucas', '2002-02-25 00:00:00', 'Lucas@myges.fr', '$2b$10$qI/grGMYt0vPNLs2Hed6GeyykHetj0OZv2kg2ctmRVNuhmsd/mbcW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJlbWFpbCI6Ikx1Y2FzQG15Z2VzLmZyIiwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNzE1NDIxNDU3LCJleHAiOjE3MTU0Mjg2NTd9.BnwFibST-h65WIuO6MluEQwDvGpZSh-E-WE-GmdqSKE', 'user'),
(11, 'User', 'Zoé', '2002-02-25 00:00:00', 'zoé@myges.fr', '$2b$10$5QCL9WtxTaH9ZLsUpuYoXu1swKvb4sS3CubkQ6hmqNk47RD4rfK6e', NULL, 'user'),
(12, 'User', 'Paul', '2002-02-25 00:00:00', 'paul@myges.fr', '$2b$10$NuO.SXvpft7GkO8bOfbFv.RENd1Shrb3h//eloNt2tLwZe98lfNVK', NULL, 'user'),
(13, 'User', 'Jean', '2002-02-25 00:00:00', 'jean@myges.fr', '$2b$10$sY4j4jBwrvkFLjmcWxyLs.kTB41VaPyEngw6cgnM5dus/HUnnms.i', NULL, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_a81090ad0ceb645f30f9399c34` (`title`);

--
-- Indexes for table `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_be800b0e57489ef4a894f51f159` (`roomId`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `screening`
--
ALTER TABLE `screening`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a84042bef1152d9dbdb1446c811` (`movieId`),
  ADD KEY `FK_5e1b4993908da2f77939337c42b` (`roomId`);

--
-- Indexes for table `screening_tickets_ticket`
--
ALTER TABLE `screening_tickets_ticket`
  ADD PRIMARY KEY (`screeningId`,`ticketId`),
  ADD KEY `IDX_7315e8dc7a93516c96cf63ff1f` (`screeningId`),
  ADD KEY `IDX_a72fb6c200f11f450a3c3430a8` (`ticketId`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_7061359da242fbf565771953137` (`ticketTypeId`),
  ADD KEY `FK_0e01a7c92f008418bad6bad5919` (`userId`);

--
-- Indexes for table `ticket_type`
--
ALTER TABLE `ticket_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_605baeb040ff0fae995404cea37` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `picture`
--
ALTER TABLE `picture`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `screening`
--
ALTER TABLE `screening`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ticket_type`
--
ALTER TABLE `ticket_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `picture`
--
ALTER TABLE `picture`
  ADD CONSTRAINT `FK_be800b0e57489ef4a894f51f159` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`);

--
-- Constraints for table `screening`
--
ALTER TABLE `screening`
  ADD CONSTRAINT `FK_5e1b4993908da2f77939337c42b` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `FK_a84042bef1152d9dbdb1446c811` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`);

--
-- Constraints for table `screening_tickets_ticket`
--
ALTER TABLE `screening_tickets_ticket`
  ADD CONSTRAINT `FK_7315e8dc7a93516c96cf63ff1ff` FOREIGN KEY (`screeningId`) REFERENCES `screening` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_a72fb6c200f11f450a3c3430a89` FOREIGN KEY (`ticketId`) REFERENCES `ticket` (`id`);

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `FK_0e01a7c92f008418bad6bad5919` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_7061359da242fbf565771953137` FOREIGN KEY (`ticketTypeId`) REFERENCES `ticket_type` (`id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `FK_605baeb040ff0fae995404cea37` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

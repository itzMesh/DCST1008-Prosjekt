-- Lager tabel for lagring av tournament informasjon
CREATE TABLE `Tournament` (
    `id` int(11) NOT NULL,
    `TournamentID` int(11) NOT NULL,
    `TournamentName` varchar(20) NOT NULL,
    `TournamentType` varchar(20) NOT NULL,
    `TournamentGamemode` varchar(20) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    ALTER TABLE `Tournament`
        ADD PRIMARY KEY (`id`);

    ALTER TABLE `Tournament`
        MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;




--Lager tabel for lagring av matches i en turnering
CREATE TABLE `GameMatch` (
    `MatchID` int(11) NOT NULL,
    `TournamentID` int(11) NOT NULL,
    `MatchNumber` int(11) NOT NULL,
    `RoundNumber` int(11) NOT NULL,
    `Team1` int(11) DEFAULT NULL,
    `Team2` int(11) DEFAULT NULL,
    `Completed` tinyint(1) NOT NULL,
    `Team1Score` int(11) NOT NULL,
    `Team2Score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    ALTER TABLE `GameMatch`
        ADD PRIMARY KEY (`MatchID`);

    ALTER TABLE `GameMatch`
        MODIFY `MatchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



--Lager table for team som er med i turneringer
CREATE TABLE `Team` (
    `id` int(11) NOT NULL,
    `TeamID` int(11) DEFAULT NULL,
    `TeamName` varchar(20) DEFAULT NULL,
    `IsShadow` tinyint(1) NOT NULL,
    `TournamentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    ALTER TABLE `Team`
        ADD PRIMARY KEY (`id`);

    ALTER TABLE `Team`
        MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



--lager table for spillere, hver spiller har et team og tilhører en turnering
CREATE TABLE `TeamMember` (
    `PlayerID` int(11) NOT NULL,
    `PlayerName` varchar(20) NOT NULL,
    `PlayerTrophies` int(11) NOT NULL,
    `TeamID` int(11) NOT NULL,
    `TournamentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    ALTER TABLE `TeamMember`
        ADD PRIMARY KEY (`PlayerID`);
    ALTER TABLE `TeamMember`
        MODIFY `PlayerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;





INSERT INTO `Tournament` (`TournamentID`, `TournamentName`, `TournamentType`, `TournamentGamemode`) VALUES
(1, 'Sommerturnering', 'bracket', '1v1'),
(5, 'nt tjunering', 'bracket', '1v1'),
(4, 'Martin sin turnering', 'bracket', '1v1');

INSERT INTO `GameMatch` (`TournamentID`, `MatchNumber`, `RoundNumber`, `Team1`, `Team2`, `Completed`, `Team1Score`, `Team2Score`) VALUES
(2, 0, 0, 13, 14, 0, 0, 0),
(2, 1, 0, 15, 16, 0, 0, 0),
(1, 2, 0, 10, NULL, 0, 2, 0),
(1, 1, 0, 6, 4, 0, 2, 0),
(1, 0, 0, 12, NULL, 0, 0, 0),
(1, 3, 0, 9, 5, 0, 0, 69),
(1, 5, 0, 7, 3, 0, 10, 0),
(1, 6, 0, 11, NULL, 0, 0, 0),
(1, 4, 0, 1, NULL, 0, 0, 0),
(1, 3, 1, 11, 8, 0, 2, 0),
(1, 0, 1, 12, 6, 0, 0, -19),
(1, 1, 1, 10, 5, 0, 0, 10),
(1, 2, 1, 1, 7, 0, 69, 0),
(1, 7, 0, 8, 2, 0, 0, -10),
(1, 0, 2, 12, 5, 0, 12, 0),
(1, 0, 3, 12, 1, 0, 0, 10),
(1, 1, 2, 1, 11, 0, 500, 0),
(5, 0, 0, 31, 30, 0, 1000000, 0),
(5, 0, 1, 31, 28, 0, 0, 0),
(5, 1, 0, 28, 29, 0, 3, 0),
(4, 0, 0, 25, NULL, 0, 3, 0),
(4, 0, 1, 25, NULL, 0, 0, 0),
(4, 1, 0, 27, 26, 0, 0, 0);

INSERT INTO `Team` (`TeamID`, `TeamName`, `IsShadow`, `TournamentID`) VALUES
(13, 'Lag12', 0, 2),
(14, 'Lag14', 0, 2),
(15, 'Lag15', 0, 2),
(16, 'Lag16', 0, 2),
(12, 'Lag12', 0, 1),
(11, 'Lag11', 0, 1),
(9, 'Lag9', 0, 1),
(1, 'Lag1', 0, 1),
(8, 'Lag8', 0, 1),
(10, 'Lag10', 0, 1),
(7, 'Lag7', 0, 1),
(6, 'Lag6', 0, 1),
(3, 'Lag3', 0, 1),
(4, 'Lag4', 0, 1),
(2, 'Lag2', 0, 1),
(5, 'Lag5', 0, 1),
(NULL, NULL, 1, 1),
(NULL, NULL, 1, 1),
(NULL, NULL, 1, 1),
(NULL, NULL, 1, 1),
(28, 'Erk', 0, 5),
(29, 'erik', 0, 5),
(31, 'eirik', 0, 5),
(30, 'eirk', 0, 5),
(NULL, NULL, 1, 4),
(25, 'Martin', 0, 4),
(27, 'jo', 0, 4),
(26, 'Nicolai', 0, 4);

INSERT INTO `TeamMember` (`PlayerName`, `PlayerTrophies`, `TeamID`, `TournamentID`) VALUES
('Jonas', 4013, 13, 2),
('Mohammed', 4014, 14, 2),
('Magnus', 4015, 15, 2),
('Aksel', 4016, 16, 2),
('Sander', 4012, 12, 1),
('Ola', 4005, 1, 1),
('Elias', 4010, 10, 1),
('Matheo', 4011, 11, 1),
('Liam', 4009, 9, 1),
('Ole Christian', 4017, 1, 1),
('Oskar', 4008, 8, 1),
('Jacob', 4007, 7, 1),
('Per', 4006, 6, 1),
('Knut', 4003, 3, 1),
('Mathias', 4004, 4, 1),
('Kari', 4002, 2, 1),
('Henrik', 4001, 5, 1),
('Erk', 100, 28, 5),
('eirik', 100000000, 31, 5),
('erik', 100, 29, 5),
('eirk', 100, 30, 5),
('Martin', 6000, 25, 4),
('jo', 1009, 27, 4),
('Nicolai', 20, 26, 4);
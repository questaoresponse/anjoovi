package teste;

import org.springframework.jdbc.core.RowMapper;
import teste.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        User user = new User();
        user.setId(resultSet.getLong("id"));
        user.setName(resultSet.getString("nome"));
        user.setEmail(resultSet.getString("email"));
        return user;
    }
}

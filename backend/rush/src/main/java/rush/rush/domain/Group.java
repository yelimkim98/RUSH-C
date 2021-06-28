package rush.rush.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Getter
@NoArgsConstructor
@Builder
@Table(name = "GROUP_TABLE")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String invitationCode;

    @CreationTimestamp
    private Timestamp createDate;

    public Group(Long id, String name, String invitationCode, Timestamp createDate) {
        validate(name);
        this.id = id;
        this.name = name;
        this.invitationCode = invitationCode;
        this.createDate = createDate;
    }

    private void validate(String name) {
        if (Objects.isNull(name)) {
            throw new IllegalArgumentException("그룹이름이 null 일 수 없습니다.");
        }
    }

    public void setInvitationCode(String invitationCode) {
        if (Objects.nonNull(this.invitationCode) && !this.invitationCode.isEmpty()) {
            throw new IllegalArgumentException("초대코드는 처음 한번만 정할 수 있습니다. 이미 부여된 초대코드가 존재합니다.");
        }
        this.invitationCode = invitationCode;
    }
}

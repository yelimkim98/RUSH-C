package rush.rush.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rush.rush.domain.Article;
import rush.rush.domain.User;
import rush.rush.dto.ArticleResponse;
import rush.rush.dto.ArticleSummaryResponse;
import rush.rush.dto.AuthorResponse;
import rush.rush.dto.CreateArticleRequest;
import rush.rush.repository.ArticleRepository;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Transactional
    public List<ArticleSummaryResponse> findPublicMapArticles(Double latitude, Double latitudeRange, Double longitude, Double longitudeRange) {
        double lowerLatitude = latitude - latitudeRange;
        double upperLatitude = latitude + latitudeRange;
        double lowerLongitude = longitude - latitudeRange;
        double upperLongitude = longitude + longitudeRange;

        List<Article> allArticles = articleRepository.findAllByLatitudeBetweenAndLongitudeBetween(
            lowerLatitude, upperLatitude, lowerLongitude, upperLongitude);

        return allArticles.stream()
            .map(article -> new ArticleSummaryResponse(
                article.getId(),
                article.getLatitude(),
                article.getLongitude(),
                article.getTitle()))
            .collect(Collectors.toList());
    }

    @Transactional
    public Long create(CreateArticleRequest createArticleRequest, User user) {
        Article article = Article.builder()
            .title(createArticleRequest.getTitle())
            .content(createArticleRequest.getContent())
            .user(user)
            .latitude(createArticleRequest.getLatitude())
            .longitude(createArticleRequest.getLongitude())
            .doesBelongToPublic(false)    // Todo: DTO 에서 가져오도록 수정할것
            .doesBelongToPrivate(false)    // Todo: DTO 에서 가져오도록 수정할것
            .build();
        return articleRepository.save(article)
            .getId();
    }

    @Transactional
    public ArticleResponse findOne(Long id) {
        Article article = articleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("id가 " + id + "인 article이 없습니다."));

        User user = article.getUser();
        AuthorResponse authorResponse = new AuthorResponse(user.getId(),
            user.getNickName(), user.getImageUrl());

        return new ArticleResponse(
            article.getId(),
            article.getTitle(),
            article.getContent(),
            article.getLatitude(),
            article.getLongitude(),
            authorResponse,
            article.getCreateDate()
        );
    }
}
